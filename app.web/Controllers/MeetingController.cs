namespace app.web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Services;
    using Microsoft.AspNetCore.Mvc;

    public class MeetingController : Controller
    {
        private IMeetingService _meetingService;

        public MeetingController(IMeetingService meetingService)
        {
            this._meetingService = meetingService;
        }

        public IMeetingService MeetinService
        {
            get
            {
                return this._meetingService;
            }

            set
            {
                this._meetingService = value;
            }
        }

        [HttpGet("/meetings")]
        public async Task<IActionResult> GetMeetingsAsync()
        {
            var meetings = await this._meetingService.GetMeetingsAsync();
            if (meetings == null)
            {
                meetings = new List<MeetingViewModel>();
            }

            return Ok(meetings);
        }

        [HttpGet("/meeting/{id}")]
        public async Task<IActionResult> GetMeetingAsync(int id)
        {
            var meeting = new MeetingViewModel()
            {
                Id = id,
                Name = "John Smith",
                Date = DateTime.Now,
                Content = "This is the content. Lorem Ipsum alari est"
            };
            await Task.Run(() =>
            {

            });
            return Ok(meeting);
        }
    }
}