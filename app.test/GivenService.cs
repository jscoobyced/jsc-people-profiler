namespace app.web.Services.Test
{
    public class GivenService
    {
        public static ProfileService ProfileService
            => new ProfileService(null);

        public static PageConfigurationService PageConfigurationService
            => new PageConfigurationService(null);

        public static PageService PageService
            => new PageService(null);
    }
}