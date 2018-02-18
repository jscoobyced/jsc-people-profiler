namespace app.web.Controllers.Tests
{
    using System.Collections.Generic;
    using System.Linq;
    using app.web.Models;
    using app.web.Services.Test;
    using FluentAssertions;
    using Microsoft.AspNetCore.Mvc;
    using Xunit;

    public class MeetingControllerTests
    {
        [Fact]
        public async void GetMeetingsAsync()
        {
            var result = await new MeetingController(null)
                .WithMeetingService(MeetingServiceModels.MeetingsViewModel)
                .GetMeetingsAsync();

            result.Should().NotBeNull("a controller should always return a result");
            result.Should().BeAssignableTo<OkObjectResult>("a valid result should be an instance of OkObjectResult");

            var okObjectResult = (OkObjectResult)result;
            okObjectResult
                .Value
                .Should().NotBeNull("the MeetingService is setup to mock a value");
            okObjectResult
                .Value
                .Should().BeAssignableTo<List<MeetingViewModel>>("the MeetingService is set to return a list of MeetingViewModel");

            var meetingViewModels = (List<MeetingViewModel>)okObjectResult.Value;

            meetingViewModels.First().Id.Should().Be(
                MeetingServiceModels.NormalMeetingViewModel.Id,
                "the MeetingService is set to return a valid MeetingService");
        }

        [Fact]
        public async void GetNoMeetingsAsync()
        {
            var result = await new MeetingController(null)
                .WithNoMeetingService()
                .GetMeetingsAsync();

            result.Should().NotBeNull("a controller should always return a result");
            result.Should().BeAssignableTo<OkObjectResult>("a valid result should be an instance of OkObjectResult");

            var okObjectResult = (OkObjectResult)result;
            okObjectResult
                .Value
                .Should().NotBeNull("the MeetingService is setup to mock a value");
            okObjectResult
                .Value
                .Should().BeAssignableTo<List<MeetingViewModel>>("the MeetingService is set to return a list of MeetingViewModel");

            var meetingViewModels = (List<MeetingViewModel>)okObjectResult.Value;

            meetingViewModels.Count.Should().Be(
                0,
                "the MeetingService is set to return an empty MeetingViewModel list");
        }
    }
}