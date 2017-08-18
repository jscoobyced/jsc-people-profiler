namespace app.web.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDatabaseRepository
    {
        Task<List<T>> ExecuteReadList<T>(
            string commandText,
            Dictionary<string, object> parameters,
            ReadList<T> read);
    }
}