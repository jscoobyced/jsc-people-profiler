namespace app.web.Services
{
    using System.Collections.Generic;
    using System.Data.Common;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Repositories;

    public class SkillService : ISkillService
    {
        private IDatabaseRepository _databaseRepository;

        public SkillService(IDatabaseRepository databaseRepository = null)
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

        public async Task<List<Skill>> GetSkillsAsync()
        {
            string commandText = @"SELECT id, name
                FROM `skill`
                ORDER BY id";
            var skills = await this._databaseRepository.ExecuteReadList<Skill>(
                commandText, null, this.ReadSkillList);
            return skills;
        }

        public async Task<List<ProfileSkill>> GetSkillsByProfileIdAsync(int profileId)
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
            var skills = await this._databaseRepository.ExecuteReadList<ProfileSkill>(
                commandText, parameters, this.ReadProfileSkillList);
            return skills;
        }

        public async Task<bool> UpdateProfileSkillsAsync(
            List<ProfileSkill> skills,
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

        private void ReadProfileSkillList(DbDataReader reader, List<ProfileSkill> skills)
        {
            skills.Add(this.ReadProfileSkill(reader));
        }

        private void ReadSkillList(DbDataReader reader, List<Skill> skills)
        {
            skills.Add(this.ReadSkill(reader));
        }

        private ProfileSkill ReadProfileSkill(DbDataReader reader)
        {
            var skill = new ProfileSkill();
            skill.Id = reader.GetInt32(reader.GetOrdinal("id"));
            skill.Name = reader.GetString(reader.GetOrdinal("name"));
            skill.Score = reader.GetInt32(reader.GetOrdinal("score"));
            return skill;
        }

        private Skill ReadSkill(DbDataReader reader)
        {
            var skill = new Skill();
            skill.Id = reader.GetInt32(reader.GetOrdinal("id"));
            skill.Name = reader.GetString(reader.GetOrdinal("name"));
            return skill;
        }

    }
}