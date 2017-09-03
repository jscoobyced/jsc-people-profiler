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
        private IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            this._profileService = profileService;
        }

        public IProfileService ProfileService
        {
            set
            {
                this._profileService = value;
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetProfilesAsync()
        {
            var positions = await this._profileService.GetPositionsAsync();
            var profiles = await this._profileService.GetProfilesAsync();
            var data = new { positions = positions, profiles = profiles };
            return Ok(data);
        }

        [HttpGet("/profile/getprofileasync/{id}")]
        public async Task<IActionResult> GetProfileAsync(int id)
        {
            var positions = await this._profileService.GetPositionsAsync();
            var profile = await this._profileService.GetProfileAsync(id);
            var data = new { positions = positions, profile = profile };
            return Ok(data);
        }

        [HttpPut("/profile/updateprofileasync/{id}")]
        public async Task<IActionResult> UpdateProfileAsync(int id, [FromBody] Profile profile)
        {
            if (profile == null || id != profile.Id)
            {
                return BadRequest();
            }

            if (id == 0)
            {
                var insertedId = await this._profileService.CreateProfileAsync(profile);
                return Ok(insertedId);
            }
            else if (await this._profileService.UpdateProfileAsync(profile))
            {
                return Ok();
            }
            return NotFound();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
