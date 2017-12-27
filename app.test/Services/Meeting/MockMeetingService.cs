namespace app.web.Services.Test
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;
    using Moq;

    public class MockMeetingService
    {
        public static IMeetingService Create(List<MeetingViewModel> meetings, bool canUpdate)
        {
            var mockMeetingService = new Mock<IMeetingService>();
            mockMeetingService
                .Setup(ms => ms.GetMeetingsAsync())
                .Returns(Task.FromResult(meetings));
            return mockMeetingService.Object;
        }
    }
}