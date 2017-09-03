namespace app.web.Services.Test
{
    using Xunit;
    using FluentAssertions;

    public class ProfileServiceTests
    {
        [Fact]
        public async void GetProfileNoIdAsyncTest()
        {
            var result = await GivenService
                .ProfileService
                .WithDatabaseRepository()
                .GetProfileAsync(-1);
            result
                .Should().BeNull("profile Id is negative");
        }

        [Fact]
        public async void GetProfileAsyncTest()
        {
            var profile = ProfileServiceModels.NormalProfile;
            var result = await GivenService
                .ProfileService
                .WithProfileDatabaseRepository(profile)
                .GetProfileAsync(profile.Id);

            result
                .Should().BeSameAs(profile);
        }

        [Fact]
        public async void GetProfilesAsyncTest()
        {
            var profiles = ProfileServiceModels.Profiles;
            var result = await GivenService
                .ProfileService
                .WithProfilesDatabaseRepository(profiles)
                .GetProfilesAsync();

            result
                .Should().BeEquivalentTo(profiles);
        }

        [Fact]
        public async void GetPositionAsyncTest()
        {
            var positions = ProfileServiceModels.Positions;
            var result = await GivenService
                .ProfileService
                .WithPositionsDatabaseRepository(positions)
                .GetPositionsAsync();

            result
                .Should().BeEquivalentTo(positions);
        }


        [Fact]
        public async void GetNullPositionAsyncTest()
        {
            var result = await GivenService
                .ProfileService
                .WithDatabaseRepository()
                .GetPositionsAsync();

            result
                .Should().BeNull();
        }

        [Fact]
        public async void UpdateProfileAsyncTest()
        {
            var result = await GivenService
                .ProfileService
                .WithDatabaseRepository()
                .UpdateProfileAsync(ProfileServiceModels.NormalProfile);

            result
                .Should().BeTrue("profile is valid");
        }

        [Fact]
        public async void UpdateNullProfileAsyncTest()
        {
            var result = await GivenService
                .ProfileService
                .WithDatabaseRepository()
                .UpdateProfileAsync(null);

            result
                .Should().BeFalse("profile object is NULL");
        }

        [Fact]
        public async void UpdateNoIdProfileAsyncTest()
        {
            var result = await GivenService
                .ProfileService
                .WithDatabaseRepository()
                .UpdateProfileAsync(ProfileServiceModels.NoIdProfile);

            result
                .Should().BeFalse("profile Id is negative");
        }

        [Fact]
        public async void CreateProfileAsyncTest()
        {
            var result = await GivenService
                .ProfileService
                .WithDatabaseRepository()
                .CreateProfileAsync(ProfileServiceModels.NoIdProfile);

            result
                .Should().Be(1, "profile created should have Id=1");
        }

        [Fact]
        public async void CreateNullProfileAsyncTest()
        {
            var result = await GivenService
                .ProfileService
                .WithDatabaseRepository()
                .CreateProfileAsync(null);

            result
                .Should().Be(-1, "profile is null");
        }
    }
}