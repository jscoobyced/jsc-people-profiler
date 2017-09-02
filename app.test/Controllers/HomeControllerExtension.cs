using app.web.Models;
using app.web.Services.Test;

namespace app.web.Controllers.Tests
{
    public static class HomeControllerExtension
    {
        public static HomeController WithPageService(this HomeController homeController)
        {
            homeController.PageService = MockPageService.Create(null);
            return homeController;
        }

        public static HomeController WithNormalPageService(
            this HomeController homeController)
        {
            homeController.PageService = MockPageService.Create(PageModels.NormalPage);
            return homeController;
        }
    }
}