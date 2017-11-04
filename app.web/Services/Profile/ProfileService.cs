namespace app.web.Services
{
    using System;
    using System.Collections.Generic;
    using System.Data.Common;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Repositories;

    public class ProfileService : IProfileService
    {
        private IDatabaseRepository _databaseRepository;

        private ISkillService _skillService;

        private ICharacteristicService _characteristicService;

        private IPositionService _positionService;

        public ProfileService(
            IDatabaseRepository databaseRepository,
            ISkillService skillService,
            ICharacteristicService characteristicService,
            IPositionService positionService)
        {
            this._databaseRepository = databaseRepository;
            this._skillService = skillService;
            this._characteristicService = characteristicService;
            this._positionService = positionService;
        }

        public IDatabaseRepository DatabaseRepository
        {
            set
            {
                this._databaseRepository = value;
            }
        }

        public async Task<ProfileViewModel> GetProfileViewModelAsync(int id)
        {
            var positions = await this._positionService.GetPositionsAsync();
            var allCharacteristics = await this._characteristicService.GetCharacteristicsAsync();
            var allSkills = await this._skillService.GetSkillsAsync();
            var profile = await this.GetProfileAsync(id);
            return new ProfileViewModel()
            {
                Positions = positions,
                Profile = profile,
                AllCharacteristics = allCharacteristics,
                AllSkills = allSkills
            };
        }

        private async Task<Profile> GetProfileAsync(int id)
        {
            string commandText = @"SELECT
                            id
                            , firstname
                            , lastname
                            , position_id
                            , start_date
                            , status
                        FROM `profile` pr
                        WHERE (pr.status = @active)
                        AND pr.id = @id
                        ORDER BY pr.id";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@id", id);
            parameters.Add("@active", Status.Active);
            var profile = await this._databaseRepository.ExecuteRead<Profile>(
                commandText, parameters, this.ReadProfile);
            if (profile != null)
            {
                profile.Characteristics = await this._characteristicService.GetCharacteristicsByProfileIdAsync(id);
                profile.Skills = await this._skillService.GetSkillsByProfileIdAsync(id);
            }

            return profile;
        }

        public async Task<ProfileViewModel> GetProfilesViewModelsAsync()
        {
            var positions = await this._positionService.GetPositionsAsync();
            var profiles = await this.GetProfilesAsync();
            return new ProfileViewModel()
            {
                Positions = positions,
                Profiles = profiles
            };
        }

        public async Task<List<Profile>> GetProfilesAsync()
        {
            string commandText = @"SELECT
                    pr.id
                    , pr.firstname
                    , pr.lastname
                    , pr.position_id
                    , pr.start_date
                    , pr.status
                FROM `profile` pr
                WHERE (pr.status = @active)
                ORDER BY pr.id";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@active", Status.Active);
            var profiles = await this._databaseRepository.ExecuteReadList<Profile>(
                commandText, parameters, this.ReadProfileList);
            return profiles;
        }

        public async Task<int> CreateProfileAsync(Profile profile)
        {
            if (profile == null)
            {
                return -1;
            }

            string commandText = @"INSERT INTO `profile`
                (firstname, lastname, start_date, position_id, status)
                VALUES(@firstname, @lastname, @startDate, @position, @status)";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@firstname", profile.FirstName);
            parameters.Add("@lastname", profile.LastName);
            parameters.Add("@startDate", profile.StartDate);
            parameters.Add("@position", profile.Position);
            parameters.Add("@status", Status.Active);
            var insertedId = await this._databaseRepository.ExecuteUpdate(
                commandText, parameters, true);

            return insertedId;
        }

        public async Task<bool> UpdateProfileAsync(Profile profile)
        {
            if (profile == null || profile.Id < 1)
            {
                return false;
            }

            string commandText = @"UPDATE `profile`
                SET firstname = @firstname,
                lastname = @lastname,
                start_date = @startDate,
                position_id = @position
                WHERE (id = @id)";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@firstname", profile.FirstName);
            parameters.Add("@lastname", profile.LastName);
            parameters.Add("@startDate", profile.StartDate);
            parameters.Add("@position", profile.Position);
            parameters.Add("@id", profile.Id);
            var columnUpdated = await this._databaseRepository.ExecuteUpdate(
                commandText, parameters, false);

            await this._characteristicService.UpdateProfileCharacteristicsAsync(profile.Characteristics, profile.Id);
            await this._skillService.UpdateProfileSkillsAsync(profile.Skills, profile.Id);
            return columnUpdated == 1;
        }

        private void ReadProfileList(DbDataReader reader, List<Profile> profiles)
        {
            profiles.Add(this.ReadProfile(reader));
        }

        private Profile ReadProfile(DbDataReader reader)
        {
            var profile = new Profile();
            profile.Id = reader.GetInt32(reader.GetOrdinal("id"));
            profile.FirstName = reader.GetString(reader.GetOrdinal("firstname"));
            profile.LastName = reader.GetString(reader.GetOrdinal("lastname"));
            profile.StartDate = reader.GetDateTime(reader.GetOrdinal("start_date"));
            profile.Position = reader.GetInt32(reader.GetOrdinal("position_id"));
            profile.Status = (Status)reader.GetInt32(reader.GetOrdinal("status"));
            return profile;
        }
    }
}