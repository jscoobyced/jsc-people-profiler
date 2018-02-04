namespace app.web.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using app.web.Models;

    public interface IMeetingService
    {
        Task<List<MeetingViewModel>> GetMeetingsAsync();

        Task<MeetingViewModel> GetMeetingAsync(int meetingId);

        Task<int> CreateMeetingAsync(MeetingViewModel meeting);

        Task<bool> UpdateMeetingAsync(MeetingViewModel meeting);
    }
}