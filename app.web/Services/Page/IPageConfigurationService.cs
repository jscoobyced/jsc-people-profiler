namespace app.web.Services
{
    using System.Threading.Tasks;

    public interface IPageConfigurationService
    {
        Task<PageConfiguration> GetPageConfiguration();
    }
}