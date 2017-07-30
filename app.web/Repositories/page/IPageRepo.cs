using System.Threading.Tasks;

namespace app.web.Repositories
{

    public interface IPageRepo
    {
        Task<PageConfiguration> GetPage();
    }
}