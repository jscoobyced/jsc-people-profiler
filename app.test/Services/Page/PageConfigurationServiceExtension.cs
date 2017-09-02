namespace app.web.Services.Test
{
    using System;
    using System.Collections.Generic;
    using app.web.Models;
    using app.web.Repositories.Tests;

    public static class PageConfigurationServiceExtension
    {
        public static PageConfigurationService WithDatabaseRepository(
            this PageConfigurationService pageConfigurationService)
        {
            var databaseRepository = MockDatabaseRepository.Create<PageConfiguration>(null, null);
            pageConfigurationService.DatabaseRepository = databaseRepository;
            return pageConfigurationService;
        }

        public static PageConfigurationService WithPageConfigurationDatabaseRepository(
            this PageConfigurationService pageConfigurationService,
            PageConfiguration pageConfiguration)
        {
            var databaseRepository = MockDatabaseRepository.Create<PageConfiguration>(pageConfiguration, null);
            pageConfigurationService.DatabaseRepository = databaseRepository;
            return pageConfigurationService;
        }

        public static PageConfigurationService WithPageConfigurationsDatabaseRepository(
            this PageConfigurationService pageConfigurationService,
            List<PageConfiguration> pageConfigurations)
        {
            var databaseRepository = MockDatabaseRepository.Create<PageConfiguration>(null, pageConfigurations);
            pageConfigurationService.DatabaseRepository = databaseRepository;
            return pageConfigurationService;
        }
    }
}