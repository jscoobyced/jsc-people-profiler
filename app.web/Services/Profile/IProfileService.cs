namespace app.web.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;

    public interface IProfileService
    {
        Task<List<Profile>> GetProfilesAsync();

        Task<List<Position>> GetPositionsAsync();

        Task<Profile> GetProfileAsync(int id);

        Task<bool> UpdateProfileAsync(Profile profile);

        Task<int> CreateProfileAsync(Profile profile);
    }
}