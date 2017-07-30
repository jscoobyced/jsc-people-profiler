namespace app.web.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;

    public interface IPageService
    {
        Task<Page> GetPage();
    }
}