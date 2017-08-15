namespace app.web.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;

    public class ProfileRepository : IProfileRepository
    {
        public async Task<List<Profile>> GetProfilesAsync()
        {
            var profiles = await Task.Run(
                () =>
                {
                    var profileList = new List<Profile>();
                    var profile = new Profile()
                    {
                        Id = 1,
                        FirstName = "John",
                        LastName = "Smith"
                    };
                    profile.SetStartDate(DateTime.Now.AddDays(-10));
                    profileList.Add(profile);
                    var profile2 = new Profile()
                    {
                        Id = 2,
                        FirstName = "Jane",
                        LastName = "Doe"
                    };
                    profile2.SetStartDate(DateTime.Now.AddDays(-10));
                    profileList.Add(profile2);
                    return profileList;
                }
            );

            return profiles;
        }
    }
}