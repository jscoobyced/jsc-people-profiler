namespace app.web.Services
{
    using System;
    using System.Collections.Generic;
    using System.Data.Common;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Repositories;

    public class ProfileService : IProfileService
    {
        private readonly IDatabaseRepository _databaseRepository;

        public ProfileService(IDatabaseRepository databaseRepository)
        {
            this._databaseRepository = databaseRepository;
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

        public async Task<bool> UpdateProfileAsync(Profile profile)
        {
            string commandText = @"UPDATE `profile`
                            set firstname = @firstname,
                            lastname = @lastname,
                            start_date = @startDate,
                            status = @status
                        WHERE (id = @id)";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@firstname", profile.FirstName);
            parameters.Add("@lastname", profile.LastName);
            parameters.Add("@startDate", profile.StartDate);
            parameters.Add("@status", (int)profile.Status);
            parameters.Add("@id", profile.Id);
            var columnUpdated = await this._databaseRepository.ExecuteUpdate(
                commandText, parameters);

            return columnUpdated == 1;
        }

        private void ReadProfileList(DbDataReader reader, List<Profile> profiles)
        {
            profiles.Add(this.ReadProfile(reader));
        }

        private void ReadPositionList(DbDataReader reader, List<Position> positions)
        {
            positions.Add(this.ReadPosition(reader));
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
    }
}