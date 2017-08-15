namespace app.web.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;

    public interface IProfileRepository
    {
        Task<List<Profile>> GetProfilesAsync();
    }
}