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

    public class DatabaseRepository : IDatabaseRepository
    {
        private readonly IOptions<AppSettings> _appSettings;

        public DatabaseRepository(IOptions<AppSettings> appSettings)
        {
            this._appSettings = appSettings;
        }

        public async Task<List<T>> ExecuteReadList<T>(
            string commandText,
            Dictionary<string, object> parameters,
            ReadList<T> read)
        {
            if (string.IsNullOrWhiteSpace(commandText))
            {
                return null;
            }

            var list = new List<T>();
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
                                    read(reader, list);
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

            return list;
        }


    }
}