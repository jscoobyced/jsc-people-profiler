using app.web.Models;
using app.web.Services.Test;

namespace app.web.Controllers.Tests
{
    public static class ProfileControllerExtension
    {
        public static ProfileController WithProfileService(
            this ProfileController pageController, ProfileViewModel profileViewModel)
        {
            pageController.ProfileService = MockProfileService.Create(
                profileViewModel,
                true);
            return pageController;
        }
        public static ProfileController WithNoProfileService(
            this ProfileController pageController)
        {
            pageController.ProfileService = MockProfileService.Create(
                null,
                true);
            return pageController;
        }

        public static ProfileController WithCannotUpdateProfileService(
            this ProfileController pageController)
        {
            pageController.ProfileService = MockProfileService.Create(
                ProfileServiceModels.NormalProfileViewModel,
                false);
            return pageController;
        }
    }
}