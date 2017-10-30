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

        public ProfileService(IDatabaseRepository databaseRepository)
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

        public async Task<Profile> GetProfileAsync(int id)
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
                profile.Characteristics = await this.GetCharacteristicsByProfileIdAsync(id);
                profile.Skills = await this.GetSkillsByProfileIdAsync(id);
            }

            return profile;
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

        public async Task<List<Position>> GetPositionsAsync()
        {
            string commandText = @"SELECT id, name
                FROM `position`
                ORDER BY id";
            var positions = await this._databaseRepository.ExecuteReadList<Position>(
                commandText, null, this.ReadPositionList);
            return positions;
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

        private async Task<List<Characteristic>> GetCharacteristicsByProfileIdAsync(int profileId)
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

        private async Task<List<Skill>> GetSkillsByProfileIdAsync(int profileId)
        {
            string commandText = @"SELECT s.id, s.name, ps.score
                FROM `profile_skill` ps
                INNER JOIN `profile` p
                ON ps.profile_id = p.id
                INNER JOIN `skill` s
                ON ps.skill_id = s.id
                AND s.status = @active
                WHERE p.id = @id
                ORDER BY s.id";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@id", profileId);
            parameters.Add("@active", Status.Active);
            var skills = await this._databaseRepository.ExecuteReadList<Skill>(
                commandText, parameters, this.ReadSkillList);
            return skills;
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

            await this.UpdateProfileCharacteristicsAsync(profile.Characteristics, profile.Id);
            await this.UpdateProfileSkillsAsync(profile.Skills, profile.Id);
            return columnUpdated == 1;
        }

        private async Task<bool> UpdateProfileCharacteristicsAsync(
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

        private async Task<bool> UpdateProfileSkillsAsync(
            List<Skill> skills,
            int profileId)
        {
            if (skills == null
                || !skills.Any()
                || profileId < 1)
            {
                return false;
            }

            var exisitingSkills = await this.GetSkillsByProfileIdAsync(profileId);

            var newSkills = skills.Where(
                skill => !exisitingSkills.Any(
                    exisitingSkill => exisitingSkill.Id == skill.Id)).ToList();
            var skillsToDelete = exisitingSkills.Where(
                exisitingSkill => !skills.Any(
                    skill => skill.Id == exisitingSkill.Id)).ToList();

            if (newSkills.Any())
            {
                var stringBuilder = new StringBuilder();
                var first = true;
                var parameters = new Dictionary<string, object>();
                for (var i = 0; i < newSkills.Count; i++)
                {
                    var profile = string.Format("@profile{0}", i);
                    var skill = string.Format("@skill{0}", i);
                    var score = string.Format("@score{0}", i);
                    stringBuilder.AppendFormat(
                        "{0}({1}, {2}, {3})", first ? "" : ",", profile, skill, score);
                    first = false;
                    parameters.Add(profile, profileId);
                    parameters.Add(skill, newSkills[i].Id);
                    parameters.Add(score, newSkills[i].Score);
                };
                string commandText = string.Format(@"INSERT INTO `profile_skill`
                (`profile_id`, `skill_id`, `score`) VALUES {0}", stringBuilder.ToString());
                var columnUpdated = await this._databaseRepository.ExecuteUpdate(
                    commandText, parameters, false);
            }

            if (skillsToDelete.Any())
            {
                var stringBuilder = new StringBuilder();
                var first = true;
                var parameters = new Dictionary<string, object>();
                for (var i = 0; i < skillsToDelete.Count; i++)
                {
                    var profile = string.Format("@profile{0}", i);
                    var skill = string.Format("@skill{0}", i);
                    stringBuilder.AppendFormat(
                        "{0}(`profile_id` = {1} AND `skill_id` = {2})",
                         first ? "" : " OR ",
                          profile,
                           skill);
                    first = false;
                    parameters.Add(profile, profileId);
                    parameters.Add(skill, skillsToDelete[i].Id);
                };
                string commandText = string.Format(@"DELETE FROM `profile_skill`
                 WHERE {0}", stringBuilder.ToString());
                var columnUpdated = await this._databaseRepository.ExecuteUpdate(
                    commandText, parameters, false);
            }

            return true;
        }

        private void ReadProfileList(DbDataReader reader, List<Profile> profiles)
        {
            profiles.Add(this.ReadProfile(reader));
        }

        private void ReadPositionList(DbDataReader reader, List<Position> positions)
        {
            positions.Add(this.ReadPosition(reader));
        }

        private void ReadCharacteristicList(DbDataReader reader, List<Characteristic> characteristics)
        {
            characteristics.Add(this.ReadCharacteristic(reader));
        }

        private void ReadSkillList(DbDataReader reader, List<Skill> skills)
        {
            skills.Add(this.ReadSkill(reader));
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

        private Position ReadPosition(DbDataReader reader)
        {
            var position = new Position();
            position.Id = reader.GetInt32(reader.GetOrdinal("id"));
            position.Name = reader.GetString(reader.GetOrdinal("name"));
            return position;
        }

        private Characteristic ReadCharacteristic(DbDataReader reader)
        {
            var characteristic = new Characteristic();
            characteristic.Id = reader.GetInt32(reader.GetOrdinal("id"));
            characteristic.Name = reader.GetString(reader.GetOrdinal("name"));
            return characteristic;
        }

        private Skill ReadSkill(DbDataReader reader)
        {
            var skill = new Skill();
            skill.Id = reader.GetInt32(reader.GetOrdinal("id"));
            skill.Name = reader.GetString(reader.GetOrdinal("name"));
            skill.Score = reader.GetInt32(reader.GetOrdinal("score"));
            return skill;
        }
    }
}