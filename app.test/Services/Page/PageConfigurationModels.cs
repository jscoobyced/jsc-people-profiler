namespace app.web.Services.Test
{
    using System.Collections.Generic;
    using app.web.Models;

    public class PageConfigurationModels
    {

        public static PageConfiguration NormalLeftPage
            => new PageConfiguration()
            {
                Id = 1,
                Name = "Normal Left Page",
                Description = "This is a normal left page",
                Url = "/page/normal/left",
                ParentId = 0,
                Order = 1,
                PageSide = PageSide.Left,
                Status = Status.Active
            };

        public static PageConfiguration NormalRightPage
            => new PageConfiguration()
            {
                Id = 2,
                Name = "Normal Right Page",
                Description = "This is a normal right page",
                Url = "/page/normal/right",
                ParentId = 0,
                Order = 1,
                PageSide = PageSide.Right,
                Status = Status.Active
            };

        public static PageConfiguration HiddenLeftPage
            => new PageConfiguration()
            {
                Id = 3,
                Name = "Hidden Left Page",
                Description = "This is a hidden left page",
                Url = "/page/normal/left",
                ParentId = 1,
                Order = 1,
                PageSide = PageSide.Left,
                Status = Status.Hidden
            };

        public static PageConfiguration HiddenRightPage
            => new PageConfiguration()
            {
                Id = 4,
                Name = "Hidden Right Page",
                Description = "This is a hidden right page",
                Url = "/page/normal/right",
                ParentId = 2,
                Order = 1,
                PageSide = PageSide.Right,
                Status = Status.Hidden
            };

        public static List<PageConfiguration> PageConfigurations
            => new List<PageConfiguration>()
            {
                NormalLeftPage,
                NormalRightPage,
                HiddenLeftPage,
                HiddenRightPage
            };

        public static PageConfiguration PageForMenu
            => new PageConfiguration()
            {
                LeftMenu = NormalLeftPage
            };
    }
}