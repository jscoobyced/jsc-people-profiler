namespace app.web.Repositories
{
    using System.Collections.Generic;
    using System.Data.Common;
    using System.Diagnostics;
    using System.Linq;
    using System.Threading.Tasks;
    using app.web.Models;
    using Microsoft.Extensions.Options;
    using MySql.Data.MySqlClient;

    public delegate void ReadList<T>(DbDataReader reader, List<T> results);

    public delegate T Read<T>(DbDataReader reader);

    public class DatabaseRepository : IDatabaseRepository
    {
        private readonly IOptions<AppSettings> _appSettings;

        public DatabaseRepository(IOptions<AppSettings> appSettings)
        {
            this._appSettings = appSettings;
        }

        public async Task<T> ExecuteRead<T>(
            string commandText,
            Dictionary<string, object> parameters,
            Read<T> read)
        {
            var result = await this.ExecuteReadAll(commandText, parameters, false, read, null);
            if (result != null && result.GetType().Equals(typeof(T)))
            {
                return (T)result;
            }

            return default(T);
        }

        public async Task<List<T>> ExecuteReadList<T>(
            string commandText,
            Dictionary<string, object> parameters,
            ReadList<T> readList)
        {
            var result = await this.ExecuteReadAll(commandText, parameters, true, null, readList);
            if (result.GetType().Equals(typeof(List<T>)))
            {
                return (List<T>)result;
            }

            return null;
        }

        private async Task<object> ExecuteReadAll<T>(
            string commandText,
            Dictionary<string, object> parameters,
            bool listMode,
            Read<T> read = null,
            ReadList<T> readList = null)
        {
            if (string.IsNullOrWhiteSpace(commandText))
            {
                return null;
            }

            var list = new List<T>();
            var result = default(T);

            var connectionString = this._appSettings.Value.ConnectionString;

            try
            {
                using (var connection = new MySqlConnection(connectionString.MySql))
                {
                    using (var command = new MySqlCommand())
                    {
                        command.Connection = connection;
                        command.CommandText = commandText;
                        if (parameters != null)
                        {
                            foreach (var key in parameters.Keys)
                            {
                                command.Parameters.AddWithValue(key, parameters[key]);
                            }
                        }

                        await connection.OpenAsync();
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (reader != null)
                            {
                                while (await reader.ReadAsync())
                                {
                                    if (listMode && readList != null)
                                    {
                                        readList(reader, list);
                                    }
                                    if (!listMode && read != null)
                                    {
                                        result = read(reader);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (MySqlException exception)
            {
                Debug.WriteLine(exception.Message);
            }

            return (listMode ? (object)list : (object)result);
        }

        public async Task<int> ExecuteUpdate(
            string commandText,
             Dictionary<string, object> parameters,
             bool isInsert)
        {
            var resultId = -1;
            if (string.IsNullOrWhiteSpace(commandText))
            {
                return resultId;
            }

            var connectionString = this._appSettings.Value.ConnectionString;

            try
            {
                using (var connection = new MySqlConnection(connectionString.MySql))
                {
                    using (var command = new MySqlCommand())
                    {
                        command.Connection = connection;
                        command.CommandText = commandText;
                        if (parameters != null)
                        {
                            foreach (var key in parameters.Keys)
                            {
                                command.Parameters.AddWithValue(key, parameters[key]);
                            }
                        }

                        await connection.OpenAsync();
                        resultId = await command.ExecuteNonQueryAsync();
                    }
                    if (isInsert)
                    {
                        using (var command = new MySqlCommand())
                        {
                            command.Connection = connection;
                            command.CommandText = "SELECT LAST_INSERT_ID()";
                            using (var reader = await command.ExecuteReaderAsync())
                            {
                                if (reader != null && await reader.ReadAsync())
                                {
                                    resultId = reader.GetInt32(0);
                                }
                            }
                        }
                    }
                }
            }
            catch (MySqlException exception)
            {
                Debug.WriteLine(exception.Message);
            }

            return resultId;
        }

    }
}