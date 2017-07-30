namespace app.web
{
    using app.web.Repositories;
    using app.web.Services;
    using Microsoft.Extensions.DependencyInjection;

    public class DependencyInjection
    {

        public void Configure(IServiceCollection services)
        {
            services.AddTransient<IPageService, PageService>();
            services.AddTransient<IPageRepo, PageRepo>();
        }
    }
}