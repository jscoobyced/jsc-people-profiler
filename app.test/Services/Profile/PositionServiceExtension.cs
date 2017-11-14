namespace app.web.Services.Test
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;
    using Moq;

    public static class PositionServiceExtension
    {
        public static Mock<IPositionService> CreateMock()
        {
            return new Mock<IPositionService>();
        }

        public static Mock<IPositionService> Initiated(
            this Mock<IPositionService> positionService)
        {
            return positionService.WithGetPositionsAsync();
        }

        public static Mock<IPositionService> WithGetPositionsAsync(
            this Mock<IPositionService> positionService)
        {
            positionService
                .Setup(ps => ps.GetPositionsAsync())
                .ReturnsAsync(ProfileServiceModels.Positions);
            return positionService;
        }
    }
}