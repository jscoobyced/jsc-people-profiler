using Moq;

namespace app.web.Services.Test
{
    public class MockPageConfigurationService
    {
        public static IPageConfigurationService Create(PageConfiguration pageConfiguration)
        {
            var mockPageConfigurationService = new Mock<IPageConfigurationService>();
            mockPageConfigurationService
                .Setup(pc => pc.GetPageConfiguration())
                .Returns(System.Threading.Tasks.Task.FromResult(pageConfiguration));
            return mockPageConfigurationService.Object;
        }
    }
}