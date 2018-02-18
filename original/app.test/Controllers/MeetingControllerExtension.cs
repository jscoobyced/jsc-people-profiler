namespace app.web.Controllers.Tests
{
    using System.Collections.Generic;
    using app.web.Models;
    using app.web.Services.Test;

    public static class MeetingControllerExtension
    {
        public static MeetingController WithMeetingService(
            this MeetingController meetingController, List<MeetingViewModel> meetingViewModels)
        {
            meetingController.MeetinService = MockMeetingService.Create(
                meetingViewModels,
                true);
            return meetingController;
        }
        
        public static MeetingController WithNoMeetingService(
            this MeetingController meetingController)
        {
            meetingController.MeetinService = MockMeetingService.Create(
                null,
                true);
            return meetingController;
        }
    }
}