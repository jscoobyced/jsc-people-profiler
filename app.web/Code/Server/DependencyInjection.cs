namespace app.web
{
    using app.web.Repositories;
    using app.web.Services;
    using Microsoft.Extensions.DependencyInjection;

    public class DependencyInjection
    {

        public void Configure(IServiceCollection services)
        {
            this.ConfigureServices(services);
            this.ConfigureRepositories(services);
        }

        private void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IPageConfigurationService, PageConfigurationService>();
            services.AddTransient<IProfileService, ProfileService>();
            services.AddTransient<IPageService, PageService>();
        }

        private void ConfigureRepositories(IServiceCollection services)
        {
            services.AddTransient<IDatabaseRepository, DatabaseRepository>();
            services.AddTransient<IProfileRepository, ProfileRepository>();
        }
    }
}