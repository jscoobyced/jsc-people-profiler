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
                        Id = 1,
                        FirstName = "John",
                        LastName = "Smith",
                        StartDate = (long)DateTime.Now.AddDays(-50).ToUniversalTime().Subtract(
    new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
    ).TotalMilliseconds
                    });
                    profileList.Add(new Profile()
                    {
                        Id = 2,
                        FirstName = "Jane",
                        LastName = "Doe",
                        StartDate = (long)DateTime.Now.ToUniversalTime().Subtract(
    new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
    ).TotalMilliseconds
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
