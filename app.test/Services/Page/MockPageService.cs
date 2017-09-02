namespace app.web.Services.Test
{
    using System.Threading.Tasks;
    using app.web.Models;
    using Moq;

    public class MockPageService
    {
        public static IPageService Create(Page page)
        {
            var mockPageService = new Mock<IPageService>();
            mockPageService
                .Setup(ps => ps.GetPage())
                .Returns(Task.FromResult(page));
            return mockPageService.Object;
        }
    }
}