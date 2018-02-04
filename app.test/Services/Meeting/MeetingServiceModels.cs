namespace app.web.Services.Test
{
    using System;
    using System.Collections.Generic;
    using app.web.Models;

    public class MeetingServiceModels
    {
        public static MeetingViewModel NormalMeetingViewModel
        => new MeetingViewModel()
        {
            Id = 1,
            Name = "John Smith",
            Content = "This is content",
            Date = DateTime.Now,
            Status = Status.Active,
            ProfileId = 1
        };

        public static MeetingViewModel NoIdMeetingViewModel
        => new MeetingViewModel()
        {
            Id = 0,
            Name = "Jane Doe",
            Content = "This is content",
            Date = DateTime.Now,
            Status = Status.Active,
            ProfileId = 1
        };

        public static List<MeetingViewModel> MeetingsViewModel
        => new List<MeetingViewModel>()
        {
            NormalMeetingViewModel,
            NoIdMeetingViewModel
        };
    }
}