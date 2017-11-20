namespace app.web.Services.Test
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Repositories.Tests;
    using Moq;

    public static class CharacteristicServiceExtension
    {

        public static Mock<ICharacteristicService> CreateMock()
        {
            return new Mock<ICharacteristicService>();
        }

        public static Mock<ICharacteristicService> Initiated(
            this Mock<ICharacteristicService> characteristicService)
        {
            characteristicService
                .WithGetCharacteristicsAsync()
                .WithGetCharacteristicsByProfileIdAsync()
                .WithUpdateProfileCharacteristicsAsync();
            return characteristicService;
        }

        public static Mock<ICharacteristicService> WithGetCharacteristicsAsync(
            this Mock<ICharacteristicService> characteristicService)
        {
            characteristicService
                .Setup(cs => cs.GetCharacteristicsAsync())
                .ReturnsAsync(ProfileServiceModels.AllCharacteristics);
            return characteristicService;
        }

        public static Mock<ICharacteristicService> WithGetCharacteristicsByProfileIdAsync(
            this Mock<ICharacteristicService> characteristicService)
        {
            characteristicService
                .Setup(cs => cs.GetCharacteristicsByProfileIdAsync(It.IsAny<int>()))
                .ReturnsAsync(ProfileServiceModels.AllCharacteristics);
            return characteristicService;
        }

        public static Mock<ICharacteristicService> WithUpdateProfileCharacteristicsAsync(
            this Mock<ICharacteristicService> characteristicService)
        {
            characteristicService
                .Setup(cs => cs.UpdateProfileCharacteristicsAsync(
                    It.IsAny<List<Characteristic>>(),
                     It.IsAny<int>()))
                .ReturnsAsync(true);
            return characteristicService;
        }

        public static CharacteristicService WithDatabaseRepository(
            this CharacteristicService characteristicService)
        {
            var databaseRepository = MockDatabaseRepository.Create<Characteristic>(null, null);
            characteristicService.DatabaseRepository = databaseRepository;
            return characteristicService;
        }

        public static CharacteristicService WithCharacteristicsDatabaseRepository(
            this CharacteristicService characteristicService)
        {
            var databaseRepository = MockDatabaseRepository.Create<Characteristic>(
                ProfileServiceModels.InfraVision,
                ProfileServiceModels.AllCharacteristics);
            characteristicService.DatabaseRepository = databaseRepository;
            return characteristicService;
        }
    }
}