namespace app.web.Services
{
    using System;
    using System.Collections.Generic;
    using System.Data.Common;
    using System.Linq;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Repositories;

    public class PageConfigurationService : IPageConfigurationService
    {
        private IDatabaseRepository _databaseRepository;

        public PageConfigurationService(IDatabaseRepository databaseRepository)
        {
            this._databaseRepository = databaseRepository;
        }

        public IDatabaseRepository DatabaseRepository
        {
            set
            {
                this._databaseRepository = value;
            }
        }

        public async Task<PageConfiguration> GetPageConfiguration()
        {
            string commandText = @"SELECT * FROM `page_configuration`
                        WHERE (`status` = @active OR `status` = @hidden)
                        ORDER BY `order`";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@active", Status.Active);
            parameters.Add("@hidden", Status.Hidden);
            var pageList = await this._databaseRepository.ExecuteReadList<PageConfiguration>(commandText, parameters, this.Read);
            this.ProcessPages(pageList);
            var page = new PageConfiguration();
            page.LeftMenu = this.LeftPage;
            page.RightMenu = this.RightPage;

            return page;
        }

        private void ProcessPages(List<PageConfiguration> pages)
        {
            if (pages == null || !pages.Any())
            {
                return;
            }

            pages.ForEach(page =>
            {
                this.SetAsChildren(page, pages);
            });
        }

        private void SetAsChildren(PageConfiguration page, List<PageConfiguration> pages)
        {
            if (page == null || pages == null || !pages.Any())
            {
                return;
            }

            if (page.ParentId == 0)
            {
                if (page.PageSide == PageSide.Left)
                {
                    this.LeftPage = page;
                }

                if (page.PageSide == PageSide.Right)
                {
                    this.RightPage = page;
                }

                return;
            }

            pages.ForEach(currentPage =>
            {
                if (currentPage.Id == page.ParentId && currentPage.PageSide == page.PageSide)
                {
                    currentPage.Children.Add(page);
                    return;
                }
            });

        }

        private PageConfiguration LeftPage { get; set; }

        private PageConfiguration RightPage { get; set; }

        private void Read(DbDataReader reader, List<PageConfiguration> pages)
        {
            var pageConfiguration = new PageConfiguration();
            pageConfiguration.Id = reader.GetInt32(reader.GetOrdinal("id"));
            pageConfiguration.Name = reader.GetString(reader.GetOrdinal("name"));
            pageConfiguration.Description = reader.GetString(reader.GetOrdinal("description"));
            pageConfiguration.Url = reader.GetString(reader.GetOrdinal("url"));
            pageConfiguration.PageSide = (PageSide)reader.GetByte(reader.GetOrdinal("side"));
            pageConfiguration.ParentId = reader.GetInt32(reader.GetOrdinal("parent_id"));
            pageConfiguration.Order = reader.GetInt32(reader.GetOrdinal("order"));
            pageConfiguration.Status = (Status)reader.GetInt32(reader.GetOrdinal("status"));
            pages.Add(pageConfiguration);
        }
    }
}