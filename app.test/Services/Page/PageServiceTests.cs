namespace app.web.Services.Test
{
    using Xunit;
    using FluentAssertions;

    public class PageServiceTests
    {
        [Fact]
        public async void GetNormalPage()
        {
            var result = await GivenService
                .PageService
                .WithPageConfigurationServiceForMenu()
                .GetPage();

            result
                .LeftMenuFirstUrl()
                .Should().BeSameAs(PageConfigurationModels.NormalLeftPage.Url);
        }

        [Fact]
        public async void GetNullPage()
        {
            var result = await GivenService
                .PageService
                .WithPageConfigurationServiceForNull()
                .GetPage();

            result.Should().NotBeNull("there should always be a default page");
            result.Menu.Should().NotBeNull("there should always be a default menu");
            result.Menu.LeftMenu.Should().BeNull("there should be no menu if page is null");
        }
    }
}