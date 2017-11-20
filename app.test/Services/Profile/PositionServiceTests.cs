namespace app.web.Services.Test
{
    using Xunit;
    using FluentAssertions;
    using app.web.Models;

    public class PositionServiceTests
    {
        [Fact]
        public async void GetNoPositionsAsyncTest()
        {
            var result = await Given
                .PositionService
                .WithDatabaseRepository()
                .GetPositionsAsync();

            result.Should().BeNull("no position found in the repository should return null");
        }

        [Fact]
        public async void GetPositionsAsyncTest()
        {
            var result = await Given
                .PositionService
                .WithPositionDatabaseRepository()
                .GetPositionsAsync();

            result.Should().NotBeNull("position found in the repository should return non-null");
            result.Should().NotBeEmpty("position found in the repository should return non-empty list");
        }
    }
}