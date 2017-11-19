namespace app.web.Services.Test
{
    public partial class Given
    {
        public static ProfileService ProfileService
            => new ProfileService();

        public static CharacteristicService CharacteristicService
            => new CharacteristicService();
    }
}