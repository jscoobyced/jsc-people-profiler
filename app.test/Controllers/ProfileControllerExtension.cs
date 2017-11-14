using app.web.Models;
using app.web.Services.Test;

namespace app.web.Controllers.Tests
{
    public static class ProfileControllerExtension
    {
        public static ProfileController WithNormalProfileService(
            this ProfileController pageController)
        {
            pageController.ProfileService = MockProfileService.Create(
                ProfileServiceModels.NormalViewModelProfile,
                true);
            return pageController;
        }

        public static ProfileController WithCannotUpdateProfileService(
            this ProfileController pageController)
        {
            pageController.ProfileService = MockProfileService.Create(
                ProfileServiceModels.NormalViewModelProfile,
                false);
            return pageController;
        }
    }
}