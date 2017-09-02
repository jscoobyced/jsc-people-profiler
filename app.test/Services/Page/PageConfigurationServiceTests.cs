namespace app.web.Services.Test
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Linq;
    using app.web.Models;
    using app.web.Repositories;
    using app.web.Services;
    using Moq;
    using Xunit;
    using FluentAssertions;

    public class PageConfigurationServiceTests
    {

        [Fact]
        public async void GetNullPageConfigurationTest()
        {
            var result = await GivenService
                .PageConfigurationService
                .WithDatabaseRepository()
                .GetPageConfiguration();

            result
                .LeftMenu
                .Should().BeNull();
        }

        [Fact]
        public async void GetPageConfigurationTest()
        {
            var result = await GivenService
                .PageConfigurationService
                .WithPageConfigurationsDatabaseRepository(PageConfigurationModels.PageConfigurations)
                .GetPageConfiguration();

            result
                .LeftMenu
                .Id
                .Should().Be(1, "it is the first left menu");
            result
                .LeftMenu
                .Children
                .First()
                .ShouldBeEquivalentTo(PageConfigurationModels.HiddenLeftPage, "it is the first left sub-menu");
            result
                .RightMenu
                .Id
                .Should().Be(2, "it is the first right menu");
            result
                .RightMenu
                .Children
                .First()
                .ShouldBeEquivalentTo(PageConfigurationModels.HiddenRightPage, "it is the first right sub-menu");
        }
    }
}