namespace app.web.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;

    public interface IProfileService
    {
        Task<ProfileViewModel> GetProfileViewModelAsync(int id);

        Task<ProfileViewModel> GetProfileViewModelsAsync();

        Task<bool> UpdateProfileAsync(Profile profile);

        Task<int> CreateProfileAsync(Profile profile);
    }
}