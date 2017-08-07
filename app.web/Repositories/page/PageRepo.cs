namespace app.web.Repositories
{
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Threading.Tasks;
    using app.web.Models;
    using Microsoft.Extensions.Options;
    using MySql.Data.MySqlClient;

    public class PageRepo : IPageRepo
    {
        private readonly IOptions<AppSettings> _appSettings;

        public PageRepo(IOptions<AppSettings> appSettings)
        {
            this._appSettings = appSettings;
        }

        public async Task<PageConfiguration> GetPage()
        {
            this.ProcessPages(await this.GetPages());
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

        private async Task<List<PageConfiguration>> GetPages()
        {
            var pages = new List<PageConfiguration>();
            var connectionString = this._appSettings.Value.ConnectionString;

            try
            {
                using (var connection = new MySqlConnection(connectionString.MySql))
                {
                    using (var command = new MySqlCommand())
                    {
                        command.Connection = connection;
                        command.CommandText = @"SELECT * FROM `page_configuration`
                        WHERE (`status` = @active OR `status` = @hidden)
                        ORDER BY `order`";
                        command.Parameters.AddWithValue("@active", (int)Status.Active);
                        command.Parameters.AddWithValue("@hidden", (int)Status.Hidden);
                        await connection.OpenAsync();
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
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
                }
            }
            catch (MySqlException exception)
            {
                Debug.WriteLine(exception.Message);
            }

            return pages;
        }
    }
}