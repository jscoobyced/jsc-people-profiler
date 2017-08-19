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
                            pr.id
                            , pr.firstname
                            , pr.lastname
                            , po.position
                            , pr.start_date
                            , pr.status
                        FROM `profile` pr
                        INNER JOIN `position` po
                            ON pr.position_id = po.id
                        WHERE (pr.status = @active)
                        AND pr.id = @id
                        ORDER BY pr.id";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@id", id);
            parameters.Add("@active", Status.Active);
            var profile = await this._databaseRepository.ExecuteRead<Profile>(
                commandText, parameters, this.Read);
            return profile;
        }

        public async Task<List<Profile>> GetProfilesAsync()
        {
            string commandText = @"SELECT
                            pr.id
                            , pr.firstname
                            , pr.lastname
                            , po.position
                            , pr.start_date
                            , pr.status
                        FROM `profile` pr
                        INNER JOIN `position` po
                            ON pr.position_id = po.id
                        WHERE (pr.status = @active)
                        ORDER BY pr.id";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@active", Status.Active);
            var profiles = await this._databaseRepository.ExecuteReadList<Profile>(
                commandText, parameters, this.ReadList);
            return profiles;
        }

        private void ReadList(DbDataReader reader, List<Profile> profiles)
        {
            profiles.Add(this.Read(reader));
        }

        private Profile Read(DbDataReader reader)
        {
            var profile = new Profile();
            profile.Id = reader.GetInt32(reader.GetOrdinal("id"));
            profile.FirstName = reader.GetString(reader.GetOrdinal("firstname"));
            profile.LastName = reader.GetString(reader.GetOrdinal("lastname"));
            profile.StartDate = reader.GetDateTime(reader.GetOrdinal("start_date"));
            profile.Position = reader.GetString(reader.GetOrdinal("position"));
            profile.Status = (Status)reader.GetInt32(reader.GetOrdinal("status"));
            return profile;
        }
    }
}