namespace app.web.Services.Test
{
    using Xunit;
    using FluentAssertions;
    using app.web.Models;

    public class CharacteristicServiceTests
    {
        [Fact]
        public async void NullGetCharacteristicsAsync()
        {
            var result = await Given.CharacteristicService
                .WithDatabaseRepository()
                .GetCharacteristicsAsync();

            result.Should()
                .BeNull("there are no characteristics in the mocked DatabaseRepository");
        }

        [Fact]
        public async void GetCharacteristicsAsync()
        {
            var result = await Given.CharacteristicService
                .WithCharacteristicsDatabaseRepository()
                .GetCharacteristicsAsync();

            result.Should()
                .NotBeNull("there are characteristics in the mocked DatabaseRepository");
            result.Should()
                .NotBeEmpty("there are several characteristics in the mocked DatabaseRepository");
        }

        [Theory]
        [InlineData(-1)]
        [InlineData(0)]
        [InlineData(1)]
        public async void GetCharacteristicsByProfileIdAsync(int profileId)
        {
            var result = await Given.CharacteristicService
                .WithCharacteristicsDatabaseRepository()
                .GetCharacteristicsByProfileIdAsync(profileId);

            result.Should()
                .NotBeNull("there are characteristics in the mocked DatabaseRepository");
            result.Should()
                .NotBeEmpty("there are several characteristics in the mocked DatabaseRepository");
        }

        [Theory]
        [InlineData(true, 0, false)]
        [InlineData(true, 1, false)]
        [InlineData(false, 0, false)]
        [InlineData(false, 1, true)]
        public async void UpdateProfileCharacteristicsAsync(bool isNullCharacteristic, int profileId, bool expected)
        {
            var result = await Given.CharacteristicService
                .WithCharacteristicsDatabaseRepository()
                .UpdateProfileCharacteristicsAsync(
                    isNullCharacteristic ? null : ProfileServiceModels.AllCharacteristics,
                    profileId);
            result.Should().Be(expected, $"Have characteristics: {isNullCharacteristic}\nProfile Id: {profileId}");
        }

        [Fact]
        public async void UpdateAndDeleteProfileCharacteristicsAsync()
        {
            var characteristics = ProfileServiceModels.AllCharacteristics;
            characteristics.Remove(ProfileServiceModels.AllCharacteristics[0]);
            characteristics.Add(new Characteristic()
            {
                Id = 3,
                Name = "Super-Jump"
            });

            var result = await Given.CharacteristicService
                .WithCharacteristicsDatabaseRepository()
                .UpdateProfileCharacteristicsAsync(characteristics, 1);
            result.Should().BeTrue();
        }
    }
}