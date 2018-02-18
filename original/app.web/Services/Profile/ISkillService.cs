namespace app.web.Services
{
    using System.Collections.Generic;
    using System.Data.Common;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Repositories;

    public interface ISkillService
    {
        Task<List<Skill>> GetSkillsAsync();

        Task<List<ProfileSkill>> GetSkillsByProfileIdAsync(int profileId);

        Task<bool> UpdateProfileSkillsAsync(List<ProfileSkill> skills, int profileId);
    }
}