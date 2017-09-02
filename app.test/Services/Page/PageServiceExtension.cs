using app.web.Models;

namespace app.web.Services.Test
{
    public static class PageServiceExtension
    {
        public static PageService WithPageConfigurationServiceForNull(
            this PageService pageService)
        {
            pageService.PageConfigurationService = MockPageConfigurationService.Create(null);
            return pageService;
        }

        public static PageService WithPageConfigurationServiceForMenu(
            this PageService pageService)
        {
            pageService.PageConfigurationService = MockPageConfigurationService.Create(PageConfigurationModels.PageForMenu);
            return pageService;
        }

        public static string LeftMenuFirstUrl(this Page page)
        {
            return page.Menu.LeftMenu.Url;
        }
    }
}