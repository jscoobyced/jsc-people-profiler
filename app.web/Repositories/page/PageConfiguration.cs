namespace app.web.Repositories
{
    using System.Collections.Generic;

    public class PageConfiguration
    {
        public PageConfiguration()
        {
            this.Children = new List<PageConfiguration>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public int ParentId { get; set; }

        public int Order { get; set; }

        public PageSide PageSide { get; set; }

        public Status Status { get; set; }

        public List<PageConfiguration> Children { get; set; }

        public PageConfiguration LeftMenu { get; set; }

        public PageConfiguration RightMenu { get; set; }
    }
}