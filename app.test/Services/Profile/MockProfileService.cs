namespace app.web.Services.Test
{
    using System.Threading.Tasks;
    using app.web.Models;
    using Moq;

    public class MockProfileService
    {
        public static IProfileService Create(Profile profile, bool canUpdate)
        {
            var mockProfileService = new Mock<IProfileService>();
            mockProfileService
                .Setup(ps => ps.GetProfileAsync(It.IsAny<int>()))
                .Returns(Task.FromResult(profile));
            mockProfileService
                .Setup(PageService=>PageService.UpdateProfileAsync(It.IsAny<Profile>()))
                .Returns(Task.FromResult(canUpdate));
            return mockProfileService.Object;
        }
    }
}