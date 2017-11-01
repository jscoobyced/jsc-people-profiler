namespace app.web.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;

    public interface ICharacteristicService
    {
        Task<List<Characteristic>> GetCharacteristicsAsync();

        Task<List<Characteristic>> GetCharacteristicsByProfileIdAsync(int profileId);

        Task<bool> UpdateProfileCharacteristicsAsync(List<Characteristic> characteristics, int profileId);
    }
}