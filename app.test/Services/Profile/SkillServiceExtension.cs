namespace app.web.Services.Test
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;
    using Moq;

    public static class SkillServiceExtension
    {

        public static Mock<ISkillService> CreateMock()
        {
            return new Mock<ISkillService>();
        }

        public static Mock<ISkillService> Initiated(this Mock<ISkillService> mockSkillService)
        {
            mockSkillService
                .WithGetSkills()
                .WithGetProfileSkills()
                .WithUpdateProfileSkillsAsync();
            return mockSkillService;
        }

        public static Mock<ISkillService> WithGetSkills(this Mock<ISkillService> mockSkillService)
        {
            mockSkillService
                .Setup(ss => ss.GetSkillsAsync())
                .ReturnsAsync(ProfileServiceModels.AllSkills);
            return mockSkillService;
        }

        public static Mock<ISkillService> WithGetProfileSkills(this Mock<ISkillService> mockSkillService)
        {
            mockSkillService
                .Setup(ss => ss.GetSkillsByProfileIdAsync(It.IsAny<int>()))
                .ReturnsAsync(ProfileServiceModels.NormalProfileSkills);
            return mockSkillService;
        }

        public static Mock<ISkillService> WithUpdateProfileSkillsAsync(this Mock<ISkillService> mockSkillService)
        {
            mockSkillService
                .Setup(ss => ss.UpdateProfileSkillsAsync(It.IsAny<List<ProfileSkill>>(), It.IsAny<int>()))
                .ReturnsAsync(true);
            return mockSkillService;
        }
    }
}