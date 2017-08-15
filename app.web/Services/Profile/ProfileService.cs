namespace app.web.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Repositories;

    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            this._profileRepository = profileRepository;
        }

        public async Task<List<Profile>> GetProfilesAsync()
        {
            return await this._profileRepository.GetProfilesAsync();
        }
    }
}