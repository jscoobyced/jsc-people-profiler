namespace app.web.Services.Test
{
    using Xunit;
    using FluentAssertions;
    using app.web.Models;

    public class SkillServiceTests
    {
        [Fact]
        public async void GetNoSkillsAsyncTest()
        {
            var result = await Given
                .SkillService
                .WithDatabaseRepository()
                .GetSkillsAsync();

            result.Should().BeNull("no skill found in repository should return null");
        }

        [Fact]
        public async void GetSkillsAsyncTest()
        {
            var result = await Given
                .SkillService
                .WithSkillsDatabaseRepository()
                .GetSkillsAsync();

            result.Should().NotBeNull("skill found in repository should return non-null");
            result.Should().NotBeEmpty("skill found in repository should return non-empty list");
        }

        [Fact]
        public async void GetNoSkillsByProfileIdAsyncTest()
        {
            var result = await Given
                .SkillService
                .WithDatabaseRepository()
                .GetSkillsByProfileIdAsync(1);

            result.Should().BeNull("no ProfileSkill found in repository should return null");
        }

        [Fact]
        public async void GetSkillsByProfileIdAsync()
        {
            var result = await Given
                .SkillService
                .WithProfileSkillsDatabaseRepository()
                .GetSkillsByProfileIdAsync(1);

            result.Should().NotBeNull("ProfileSkill found in repository should return non-null");
            result.Should().NotBeEmpty("ProfileSkill found in repository should return non-empty list");
        }

        [Theory]
        [InlineData(true, 0, false)]
        [InlineData(true, 1, false)]
        [InlineData(false, 0, false)]
        [InlineData(false, 1, true)]
        public async void UpdateProfileSkillsAsync(bool isNullSkill, int profileId, bool expected)
        {
            var result = await Given.SkillService
                .WithProfileSkillsDatabaseRepository()
                .UpdateProfileSkillsAsync(
                    isNullSkill ? null : ProfileServiceModels.NormalProfileSkills,
                    profileId);
            result.Should().Be(expected, $"Have skills: {isNullSkill}\nProfile Id: {profileId}");
        }

        [Fact]
        public async void UpdateAndDeleteProfileSkillsAsync()
        {
            var profileSkills = ProfileServiceModels.NormalProfileSkills;
            profileSkills.Remove(ProfileServiceModels.NormalProfileSkills[0]);
            profileSkills.Add(new ProfileSkill()
            {
                Id = 3,
                Name = "Super-Jump",
                Score = 4
            });

            var result = await Given.SkillService
                .WithProfileSkillsDatabaseRepository()
                .UpdateProfileSkillsAsync(profileSkills, 1);
            result.Should().BeTrue();
        }

    }
}