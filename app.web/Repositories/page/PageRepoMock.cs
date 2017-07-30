namespace app.web.Repositories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class PageRepoMock : IPageRepo
    {
        public async Task<PageConfiguration> GetPage()
        {
            return await this.CreatePages();
        }

        private async Task<PageConfiguration> CreatePages()
        {
            var page = new PageConfiguration();

            await Task.Run(() =>
            {
                var p1 = new PageConfiguration();
                p1.Name = "";
                p1.Url = "#";
                p1.Description = "Left Menu";
                p1.Id = 1;
                p1.ParentId = 0;
                p1.PageSide = PageSide.Left;
                p1.Order = 1;
                p1.Status = Status.Active;
                var p2 = new PageConfiguration();
                p2.Name = "Home";
                p2.Url = "/";
                p2.Description = "Home page of the profiler application";
                p2.Id = 2;
                p2.ParentId = 1;
                p2.PageSide = PageSide.Left;
                p2.Order = 2;
                p2.Status = Status.Active;
                var p3 = new PageConfiguration();
                p3.Name = "";
                p3.Url = "#";
                p3.Description = "Right Menu";
                p3.Id = 3;
                p3.ParentId = 0;
                p3.PageSide = PageSide.Right;
                p3.Order = 1;
                p3.Status = Status.Active;
                var p4 = new PageConfiguration();
                p4.Name = "Configurations";
                p4.Url = "#";
                p4.Description = "Configurations";
                p4.Id = 4;
                p4.ParentId = 3;
                p4.PageSide = PageSide.Right;
                p4.Order = 2;
                p4.Status = Status.Active;
                var p5 = new PageConfiguration();
                p5.Name = "General Settings";
                p5.Url = "#settings";
                p5.Description = "General configurations";
                p5.Id = 5;
                p5.ParentId = 4;
                p5.PageSide = PageSide.Right;
                p5.Order = 3;
                p5.Status = Status.Active;
                var p6 = new PageConfiguration();
                p6.Name = "Profiles";
                p6.Url = "#members";
                p6.Description = "Profiles of members";
                p6.Id = 6;
                p6.ParentId = 4;
                p6.PageSide = PageSide.Right;
                p6.Order = 4;
                p6.Status = Status.Active;
                var p7 = new PageConfiguration();
                p7.Name = "Help";
                p7.Url = "#help";
                p7.Description = "Help page of the profiler application";
                p7.Id = 7;
                p7.ParentId = 3;
                p7.PageSide = PageSide.Right;
                p7.Order = 5;
                p7.Status = Status.Active;

                p1.Children.Add(p2);
                p3.Children.Add(p4);
                p4.Children.Add(p5);
                p4.Children.Add(p6);
                p3.Children.Add(p7);

                page.LeftMenu = p1;
                page.RightMenu = p3;
            });

            return page;
        }
    }
}