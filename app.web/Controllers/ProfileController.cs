namespace app.web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Services;
    using Microsoft.AspNetCore.Mvc;

    public class ProfileController : Controller
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            this._profileService = profileService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfilesAsync()
        {
            var profiles = await this._profileService.GetProfilesAsync();
            return Ok(profiles);
        }

        [HttpGet("/profile/getprofileasync/{id}")]
        public async Task<IActionResult> GetProfileAsync(int id)
        {
            var profiles = await this._profileService.GetProfileAsync(id);
            return Ok(profiles);
        }

        [HttpPut("/profile/updateprofileasync/{id}")]
        public async Task<IActionResult> UpdateProfileAsync(int id, [FromBody] Profile profile)
        {
            if(id != profile.Id)
            {
                return BadRequest();
            }

            if (await this._profileService.UpdateProfileAsync(profile))
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }

        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
