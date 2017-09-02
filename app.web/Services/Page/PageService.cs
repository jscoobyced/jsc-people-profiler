namespace app.web.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using app.web.Models;

    public class PageService : IPageService
    {

        private IPageConfigurationService _pageConfigurationService;

        public PageService(IPageConfigurationService pageConfigurationService)
        {
            this._pageConfigurationService = pageConfigurationService;
        }

        public IPageConfigurationService PageConfigurationService
        {
            set
            {
                this._pageConfigurationService = value;
            }
        }

        public async Task<Page> GetPage()
        {
            var page = new Page();
            page.Menu = await this.GetMenu();
            return page;
        }

        private async Task<Menu> GetMenu()
        {
            var menu = new Menu();
            var pageConfiguration = await this._pageConfigurationService.GetPageConfiguration();
            if (pageConfiguration == null)
            {
                return menu;
            }

            menu.LeftMenu = this.GetMenuItem(pageConfiguration.LeftMenu);
            menu.RightMenu = this.GetMenuItem(pageConfiguration.RightMenu);
            return menu;
        }

        private MenuItem GetMenuItem(PageConfiguration page)
        {
            var menuItem = new MenuItem();
            if (page == null)
            {
                return menuItem;
            }

            menuItem.Title = page.Name;
            menuItem.Url = page.Url;
            menuItem.Description = page.Description;
            menuItem.Order = page.Order;
            menuItem.Status = (int)page.Status;
            if (page.Children != null && page.Children.Any())
            {
                menuItem.MenuItems = new List<MenuItem>();
                page.Children.ForEach(
                    child =>
                    {
                        menuItem.MenuItems.Add(this.GetMenuItem(child));
                    });
            }

            menuItem.Sort();
            return menuItem;
        }
    }
}