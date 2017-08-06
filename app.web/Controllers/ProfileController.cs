namespace app.web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;
    using Microsoft.AspNetCore.Mvc;

    public class ProfileController : Controller
    {

        public ProfileController()
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetProfilesAsync()
        {
            var profiles = await Task.Run(
                () =>
                {
                    var profileList = new List<Profile>();
                    profileList.Add(new Profile()
                    {
                        FirstName = "John",
                        LastName = "Smith",
                        StartDate = DateTime.Now
                    });
                    return profileList;
                }
            );

            return Ok(profiles);
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
