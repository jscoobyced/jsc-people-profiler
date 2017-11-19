namespace app.web.Services.Test
{
    using Xunit;
    using FluentAssertions;

    public class ProfileServiceTests
    {
        [Fact]
        public async void GetProfileNoIdAsyncTest()
        {
            var result = await Given
                .ProfileService
                .WithDatabaseRepository()
                .WithInitiatedSkillService()
                .WithInitiatedCharacteristicService()
                .WithInitiatedPositionService()
                .GetProfileViewModelAsync(-1);
            result.Profile
                .Should().BeNull("profile Id is negative");
        }

        [Fact]
        public async void GetProfileAsyncTest()
        {
            var profile = ProfileServiceModels.NormalProfileViewModel;
            var result = await Given
                .ProfileService
                .WithProfileDatabaseRepository(profile.Profile)
                .WithInitiatedSkillService()
                .WithInitiatedCharacteristicService()
                .WithInitiatedPositionService()
                .GetProfileViewModelAsync(profile.Profile.Id);

            result
                .ShouldBeEquivalentTo(profile);
        }

        [Fact]
        public async void GetProfilesAsyncTest()
        {
            var profiles = ProfileServiceModels.Profiles;
            var result = await Given
                .ProfileService
                .WithProfilesDatabaseRepository(profiles)
                .WithInitiatedSkillService()
                .WithInitiatedCharacteristicService()
                .WithInitiatedPositionService()
                .GetProfilesAsync();

            result
                .Should().BeSameAs(profiles);
        }

        [Fact]
        public async void UpdateProfileAsyncTest()
        {
            var result = await Given
                .ProfileService
                .WithDatabaseRepository()
                .WithInitiatedSkillService()
                .WithInitiatedCharacteristicService()
                .WithInitiatedPositionService()
                .UpdateProfileAsync(ProfileServiceModels.NormalProfile);

            result
                .Should().BeTrue("profile is valid");
        }

        [Fact]
        public async void UpdateNullProfileAsyncTest()
        {
            var result = await Given
                .ProfileService
                .WithDatabaseRepository()
                .WithInitiatedSkillService()
                .WithInitiatedCharacteristicService()
                .WithInitiatedPositionService()
                .UpdateProfileAsync(null);

            result
                .Should().BeFalse("profile object is NULL");
        }

        [Fact]
        public async void UpdateNoIdProfileAsyncTest()
        {
            var result = await Given
                .ProfileService
                .WithDatabaseRepository()
                .WithInitiatedSkillService()
                .WithInitiatedCharacteristicService()
                .WithInitiatedPositionService()
                .UpdateProfileAsync(ProfileServiceModels.NoIdProfile);

            result
                .Should().BeFalse("profile Id is negative");
        }

        [Fact]
        public async void CreateProfileAsyncTest()
        {
            var result = await Given
                .ProfileService
                .WithDatabaseRepository()
                .WithInitiatedSkillService()
                .WithInitiatedCharacteristicService()
                .WithInitiatedPositionService()
                .CreateProfileAsync(ProfileServiceModels.NoIdProfile);

            result
                .Should().Be(1, "profile created should have Id=1");
        }

        [Fact]
        public async void CreateNullProfileAsyncTest()
        {
            var result = await Given
                .ProfileService
                .WithDatabaseRepository()
                .WithInitiatedSkillService()
                .WithInitiatedCharacteristicService()
                .WithInitiatedPositionService()
                .CreateProfileAsync(null);

            result
                .Should().Be(-1, "profile is null");
        }
    }
}