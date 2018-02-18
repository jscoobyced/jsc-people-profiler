namespace app.web.Services.Test
{
    public partial class Given
    {
        public static ProfileService ProfileService
            => new ProfileService();

        public static CharacteristicService CharacteristicService
            => new CharacteristicService();

        public static PositionService PositionService
            => new PositionService();

        public static SkillService SkillService
            => new SkillService();
    }
}