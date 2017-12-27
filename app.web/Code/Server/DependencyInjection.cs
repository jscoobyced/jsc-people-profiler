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
            services.AddTransient<IProfileService, ProfileService>();
            services.AddTransient<ISkillService, SkillService>();
            services.AddTransient<ICharacteristicService, CharacteristicService>();
            services.AddTransient<IPositionService, PositionService>();
            services.AddTransient<IMeetingService, MeetingService>();
        }

        private void ConfigureRepositories(IServiceCollection services)
        {
            services.AddTransient<IDatabaseRepository, DatabaseRepository>();
        }
    }
}