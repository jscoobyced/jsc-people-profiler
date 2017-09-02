namespace app.web.Controllers.Tests
{
    using app.web.Models;
    using app.web.Services.Test;
    using FluentAssertions;
    using Microsoft.AspNetCore.Mvc;
    using Xunit;

    public class ProfileControllerTests
    {
        [Fact]
        public async void GetProfileAsyncTest()
        {
            var result = await new ProfileController(null)
                .WithNormalProfileService()
                .GetProfileAsync(1);

            result.Should().NotBeNull();
            result.Should().BeAssignableTo<OkObjectResult>();

            var okObjectResult = (OkObjectResult)result;
            okObjectResult
                .Value
                .Should().NotBeNull();
            okObjectResult
                .Value
                .Should().NotBeNull();
        }

        [Fact]
        public async void GetProfilesAsyncTest()
        {
            var result = await new ProfileController(null)
                .WithNormalProfileService()
                .GetProfilesAsync();

            result.Should().NotBeNull();
            result.Should().BeAssignableTo<OkObjectResult>();

            var okObjectResult = (OkObjectResult)result;
            okObjectResult
                .Value
                .Should().NotBeNull();
            okObjectResult
                .Value
                .Should().NotBeNull();
        }

        [Fact]
        public async void UpdateNullProfileAsyncTest()
        {
            var result = await new ProfileController(null)
                .WithNormalProfileService()
                .UpdateProfileAsync(0, null);

            result.Should().NotBeNull();
            result.Should().BeAssignableTo<BadRequestResult>();
        }

        [Fact]
        public async void UpdateUnmatchingIdProfileAsyncTest()
        {
            var result = await new ProfileController(null)
                .WithNormalProfileService()
                .UpdateProfileAsync(0, ProfileServiceModels.NormalProfile);

            result.Should().NotBeNull();
            result.Should().BeAssignableTo<BadRequestResult>();
        }

        [Fact]
        public async void UpdateProfileAsyncTest()
        {
            var result = await new ProfileController(null)
                .WithNormalProfileService()
                .UpdateProfileAsync(1, ProfileServiceModels.NormalProfile);

            result.Should().NotBeNull();
            result.Should().BeAssignableTo<OkResult>();
        }

        [Fact]
        public async void UpdateNotFoundProfileAsyncTest()
        {
            var result = await new ProfileController(null)
                .WithCannotUpdateProfileService()
                .UpdateProfileAsync(1, ProfileServiceModels.NormalProfile);

            result.Should().NotBeNull();
            result.Should().BeAssignableTo<NotFoundResult>();
        }
    }
}