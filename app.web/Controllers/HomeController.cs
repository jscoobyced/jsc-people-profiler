namespace app.web.Controllers
{
    using System.Threading.Tasks;
    using app.web.Services;
    using Microsoft.AspNetCore.Mvc;

    public class HomeController : Controller
    {
        private IPageService _pageService;

        public HomeController(IPageService pageService)
        {
            this._pageService = pageService;
        }

        public IPageService PageService
        {
            set
            {
                this._pageService = value;
            }
        }

        public async Task<IActionResult> Index()
        {
            return this.View(await this._pageService.GetPage());
        }
    }
}
