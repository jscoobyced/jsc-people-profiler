namespace app.web.Models
{
    using System.Collections.Generic;
    using System.Linq;

    public class MenuItem
    {
        private List<MenuItem> _menuItems;

        public string Title { get; set; }

        public string Description { get; set; }

        public string Url { get; set; }

        public int Order
        {
            private get;
            set;
        }

        public List<MenuItem> MenuItems
        {
            get
            {
                return this._menuItems;
            }

            set
            {
                this._menuItems = value;
            }
        }

        public void Sort()
        {
            if (this._menuItems != null)
            {
                this._menuItems = this._menuItems.OrderBy(mi => mi.Order).ToList<MenuItem>();
            }
        }
    }
}