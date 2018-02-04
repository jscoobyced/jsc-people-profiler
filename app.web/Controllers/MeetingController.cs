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
            var meeting = await this._meetingService.GetMeetingAsync(id);
            if (meeting == null)
            {
                meeting = new MeetingViewModel();
            }

            return Ok(meeting);
        }

        
        [HttpPut("/meeting/{id}")]
        public async Task<IActionResult> UpdateMeetingAsync(int id, [FromBody] MeetingViewModel meeting)
        {
            if (meeting == null || id != meeting.Id)
            {
                return BadRequest();
            }

            if (id == 0)
            {
                var insertedId = await this._meetingService.CreateMeetingAsync(meeting);
                return Ok(insertedId);
            }
            else if (await this._meetingService.UpdateMeetingAsync(meeting))
            {
                return Ok();
            }
            return NotFound();
        }
    }
}