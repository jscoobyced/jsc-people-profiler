namespace app.web.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;

    public interface IProfileService
    {
        Task<List<Profile>> GetProfilesAsync();

        Task<Profile> GetProfileAsync(int id);
    }
}