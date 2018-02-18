namespace app.web.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDatabaseRepository
    {
        Task<T> ExecuteRead<T>(
            string commandText,
            Dictionary<string, object> parameters,
            Read<T> read);

        Task<List<T>> ExecuteReadList<T>(
            string commandText,
            Dictionary<string, object> parameters,
            ReadList<T> read);

        Task<int> ExecuteUpdate(string commandText,
            Dictionary<string, object> parameters, bool isInsert);

    }
}