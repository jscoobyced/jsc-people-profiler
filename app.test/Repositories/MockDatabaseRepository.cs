namespace app.web.Repositories.Tests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Moq;

    public class MockDatabaseRepository
    {
        public static IDatabaseRepository Create<T>(T result, List<T> results)
        {
            var mockDatabaseRepository = new Mock<IDatabaseRepository>();
            mockDatabaseRepository
            .Setup(d => d.ExecuteRead(
                It.IsAny<string>(),
                It.IsAny<Dictionary<string, object>>(),
                It.IsAny<Read<T>>()))
            .Returns(Task.FromResult(result));
            mockDatabaseRepository
            .Setup(d => d.ExecuteReadList(
                It.IsAny<string>(),
                It.IsAny<Dictionary<string, object>>(),
                It.IsAny<ReadList<T>>()))
            .Returns(Task.FromResult(results));
            mockDatabaseRepository
            .Setup(d => d.ExecuteUpdate(
                It.IsAny<string>(),
                It.IsAny<Dictionary<string, object>>()))
            .Returns(Task.FromResult(1));
            return mockDatabaseRepository.Object;
        }
    }
}