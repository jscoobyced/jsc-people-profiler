namespace app.web.Services.Test
{
    using System;
    using System.Collections.Generic;
    using app.web.Models;
    using app.web.Repositories.Tests;

    public static class ProfileServiceExtension
    {
        public static ProfileService WithDatabaseRepository(
            this ProfileService profileService)
        {
            var databaseRepository = MockDatabaseRepository.Create<Profile>(null, null);
            profileService.DatabaseRepository = databaseRepository;
            return profileService;
        }

        public static ProfileService WithProfileDatabaseRepository(
            this ProfileService profileService,
            Profile profile)
        {
            var databaseRepository = MockDatabaseRepository.Create<Profile>(profile, null);
            profileService.DatabaseRepository = databaseRepository;
            return profileService;
        }

        public static ProfileService WithPositionsDatabaseRepository(
            this ProfileService profileService,
            List<Position> positions)
        {
            var databaseRepository = MockDatabaseRepository.Create<Position>(null, positions);
            profileService.DatabaseRepository = databaseRepository;
            return profileService;
        }

        public static ProfileService WithProfilesDatabaseRepository(
            this ProfileService profileService,
            List<Profile> profiles)
        {
            var databaseRepository = MockDatabaseRepository.Create<Profile>(null, profiles);
            profileService.DatabaseRepository = databaseRepository;
            return profileService;
        }
    }
}