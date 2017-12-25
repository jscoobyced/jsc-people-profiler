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
        [HttpGet("/meeting/{id}")]
        public async Task<IActionResult> GetMeetingAsync(int id)
        {
            var meeting = new
            {
                id = id,
                name = "John Smith",
                date = DateTime.Now,
                content = "This is the content. Lorem Ipsum alari est"
            };
            await Task.Run(()=>
            {

            });
            return Ok(meeting);
        }
    }
}