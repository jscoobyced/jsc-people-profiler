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
                .WithProfileService(ProfileServiceModels.NormalProfileViewModel)
                .GetProfileAsync(1);

            result.Should().NotBeNull("a controller should always return a result");
            result.Should().BeAssignableTo<OkObjectResult>("a valid result should be an instance of OkObjectResult");

            var okObjectResult = (OkObjectResult)result;
            okObjectResult
                .Value
                .Should().NotBeNull("the ProfileService is setup to mock a value");
            okObjectResult
                .Value
                .Should().BeAssignableTo<ProfileViewModel>("the ProfileService is set to return a ProfileViewModel");

            var profileViewModel = (ProfileViewModel)okObjectResult.Value;

            profileViewModel.Profile.Id.Should().Be(
                ProfileServiceModels.NormalProfileViewModel.Profile.Id,
                "the ProfileService is set to return a valid ProfileViewModel");
        }

        [Fact]
        public async void GetNoIdProfileAsyncTest()
        {
            var result = await new ProfileController(null)
                .WithNoProfileService()
                .GetProfileAsync(-1);

            result.Should().NotBeNull("a controller should always return a result");
            result.Should().BeAssignableTo<OkObjectResult>("a valid result should be an instance of OkObjectResult");

            var okObjectResult = (OkObjectResult)result;
            okObjectResult
                .Value
                .Should().BeNull("a non-existent profile Id should return a NULL ProfileViewModel");
        }

        [Fact]
        public async void GetProfilesAsyncTest()
        {
            var result = await new ProfileController(null)
                .WithProfileService(ProfileServiceModels.NormalProfileViewModel)
                .GetProfilesAsync();

            result.Should().NotBeNull("a controller should always return a result");
            result.Should().BeAssignableTo<OkObjectResult>("a valid result should be an instance of OkObjectResult");

            var okObjectResult = (OkObjectResult)result;
            okObjectResult
                .Value
                .Should().NotBeNull("a profile list should be found");
        }

        [Fact]
        public async void UpdateNullProfileAsyncTest()
        {
            var result = await new ProfileController(null)
                .WithProfileService(ProfileServiceModels.NormalProfileViewModel)
                .UpdateProfileAsync(0, null);

            result.Should().NotBeNull("a controller should always return a result");
            result.Should().BeAssignableTo<BadRequestResult>("an attempt to update a null Profile should result in an error");
        }

        [Fact]
        public async void UpdateUnmatchingIdProfileAsyncTest()
        {
            var result = await new ProfileController(null)
                .WithProfileService(ProfileServiceModels.NormalProfileViewModel)
                .UpdateProfileAsync(0, ProfileServiceModels.NormalProfile);

            result.Should().NotBeNull("a controller should always return a result");
            result.Should().BeAssignableTo<BadRequestResult>("an attempt to update an invalid Profile Id should result in an error");
        }

        [Fact]
        public async void UpdateProfileAsyncTest()
        {
            var result = await new ProfileController(null)
                .WithProfileService(ProfileServiceModels.NormalProfileViewModel)
                .UpdateProfileAsync(1, ProfileServiceModels.NormalProfile);

            result.Should().NotBeNull("a controller should always return a result");
            result.Should().BeAssignableTo<OkResult>("updating a valid Profile should succeed");
        }

        [Fact]
        public async void UpdateNotFoundProfileAsyncTest()
        {
            var result = await new ProfileController(null)
                .WithCannotUpdateProfileService()
                .UpdateProfileAsync(1, ProfileServiceModels.NormalProfile);

            result.Should().NotBeNull("a controller should always return a result");
            result.Should().BeAssignableTo<NotFoundResult>("an attempt to update a non-existent Profile Id should result in an error");
        }
    }
}