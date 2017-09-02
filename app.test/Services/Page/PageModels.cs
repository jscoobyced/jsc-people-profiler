namespace app.web.Services.Test
{
    using app.web.Models;

    public class PageModels
    {
        public static Page NormalPage
            => new Page()
            {
                Menu = new Menu()
                {
                    LeftMenu = new MenuItem()
                    {
                        Title = "Left Menu"
                    },
                    RightMenu = new MenuItem()
                    {
                        Title = "Right Menu"
                    }
                }
            };
    }
}