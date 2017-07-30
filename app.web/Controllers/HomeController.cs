namespace app.web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Services;
    using Microsoft.AspNetCore.Mvc;

    public class HomeController : Controller
    {
        private readonly IPageService _pageService;

        public HomeController(IPageService pageService)
        {
            this._pageService = pageService;
        }

        public async Task<IActionResult> Index()
        {
            ViewData["Message"] = "Welcome here!";
            return View(await this._pageService.GetPage());
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
