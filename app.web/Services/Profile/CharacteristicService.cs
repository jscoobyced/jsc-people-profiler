namespace app.web.Services
{
    using System.Collections.Generic;
    using System.Data.Common;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Repositories;

    public class CharacteristicService : ICharacteristicService
    {
        private IDatabaseRepository _databaseRepository;

        public CharacteristicService(IDatabaseRepository databaseRepository = null)
        {
            this._databaseRepository = databaseRepository;
        }

        public IDatabaseRepository DatabaseRepository
        {
            set
            {
                this._databaseRepository = value;
            }
        }

        public async Task<List<Characteristic>> GetCharacteristicsAsync()
        {
            string commandText = @"SELECT id, name
                FROM `characteristic`
                ORDER BY id";
            var characteristics = await this._databaseRepository.ExecuteReadList<Characteristic>(
                commandText, null, this.ReadCharacteristicList);
            return characteristics;
        }

        public async Task<List<Characteristic>> GetCharacteristicsByProfileIdAsync(int profileId)
        {
            string commandText = @"SELECT c.id, c.name
                FROM `profile_characteristic` pc
                INNER JOIN `profile` p
                ON pc.profile_id = p.id
                INNER JOIN `characteristic` c
                ON pc.characteristic_id = c.id
                AND c.status = @active
                WHERE p.id = @id
                ORDER BY c.id";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@id", profileId);
            parameters.Add("@active", Status.Active);
            var characteristics = await this._databaseRepository.ExecuteReadList<Characteristic>(
                commandText, parameters, this.ReadCharacteristicList);
            return characteristics;
        }

        public async Task<bool> UpdateProfileCharacteristicsAsync(
            List<Characteristic> characteristics,
            int profileId)
        {
            if (characteristics == null
                || !characteristics.Any()
                || profileId < 1)
            {
                return false;
            }

            var exisitingCharacteristics = await this.GetCharacteristicsByProfileIdAsync(profileId);

            var newCharacteristics = characteristics.Where(
                characteristic => !exisitingCharacteristics.Any(
                    exisitingCharacteristic => exisitingCharacteristic.Id == characteristic.Id)).ToList();
            var characteristicsToDelete = exisitingCharacteristics.Where(
                exisitingCharacteristic => !characteristics.Any(
                    characteristic => characteristic.Id == exisitingCharacteristic.Id)).ToList();

            if (newCharacteristics.Any())
            {
                var stringBuilder = new StringBuilder();
                var first = true;
                var parameters = new Dictionary<string, object>();
                for (var i = 0; i < newCharacteristics.Count; i++)
                {
                    var profile = string.Format("@profile{0}", i);
                    var characteristic = string.Format("@characteristic{0}", i);
                    stringBuilder.AppendFormat(
                        "{0}({1}, {2})", first ? "" : ",", profile, characteristic);
                    first = false;
                    parameters.Add(profile, profileId);
                    parameters.Add(characteristic, newCharacteristics[i].Id);
                };
                string commandText = string.Format(@"INSERT INTO `profile_characteristic`
                (`profile_id`, `characteristic_id`) VALUES {0}", stringBuilder.ToString());
                var columnUpdated = await this._databaseRepository.ExecuteUpdate(
                    commandText, parameters, false);
            }

            if (characteristicsToDelete.Any())
            {
                var stringBuilder = new StringBuilder();
                var first = true;
                var parameters = new Dictionary<string, object>();
                for (var i = 0; i < characteristicsToDelete.Count; i++)
                {
                    var profile = string.Format("@profile{0}", i);
                    var characteristic = string.Format("@characteristic{0}", i);
                    stringBuilder.AppendFormat(
                        "{0}(`profile_id` = {1} AND `characteristic_id` = {2})",
                         first ? "" : " OR ",
                          profile,
                           characteristic);
                    first = false;
                    parameters.Add(profile, profileId);
                    parameters.Add(characteristic, characteristicsToDelete[i].Id);
                };
                string commandText = string.Format(@"DELETE FROM `profile_characteristic`
                 WHERE {0}", stringBuilder.ToString());
                var columnUpdated = await this._databaseRepository.ExecuteUpdate(
                    commandText, parameters, false);
            }

            return true;
        }

        private void ReadCharacteristicList(DbDataReader reader, List<Characteristic> characteristics)
        {
            characteristics.Add(this.ReadCharacteristic(reader));
        }

        private Characteristic ReadCharacteristic(DbDataReader reader)
        {
            var characteristic = new Characteristic();
            characteristic.Id = reader.GetInt32(reader.GetOrdinal("id"));
            characteristic.Name = reader.GetString(reader.GetOrdinal("name"));
            return characteristic;
        }

    }
}