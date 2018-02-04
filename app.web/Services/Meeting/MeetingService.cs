namespace app.web.Services
{
    using System;
    using System.Collections.Generic;
    using System.Data.Common;
    using System.Threading.Tasks;
    using app.web.Models;
    using app.web.Repositories;

    public class MeetingService : IMeetingService
    {
        private IDatabaseRepository _databaseRepository;

        public MeetingService(IDatabaseRepository databaseRepository)
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

        public async Task<List<MeetingViewModel>> GetMeetingsAsync()
        {
            string commandText = @"SELECT
                    m.id
                    , m.profile_id
                    , p.firstname
                    , p.lastname
                    , m.meeting_date
                    , m.content
                    , m.status
                FROM `meeting` m
                JOIN `profile` p
                ON m.profile_id = p.id
                WHERE (m.status = @active)
                ORDER BY m.id";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@active", Status.Active);
            var meetings = await this._databaseRepository.ExecuteReadList<MeetingViewModel>(
                commandText, parameters, this.ReadMeetingList);

            return meetings;
        }

        public async Task<MeetingViewModel> GetMeetingAsync(int meetingId)
        {
            string commandText = @"SELECT
                    m.id
                    , m.profile_id
                    , p.firstname
                    , p.lastname
                    , m.meeting_date
                    , m.content
                    , m.status
                FROM `meeting` m
                JOIN `profile` p
                ON m.profile_id = p.id
                WHERE (m.status = @active)
                AND m.id = @meetingId
                ORDER BY m.id";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@active", Status.Active);
            parameters.Add("@meetingId", meetingId);
            var meetings = await this._databaseRepository.ExecuteRead<MeetingViewModel>(
                commandText, parameters, this.ReadMeeting);

            return meetings;
        }

        public async Task<int> CreateMeetingAsync(MeetingViewModel meeting)
        {
            if (meeting == null)
            {
                return -1;
            }

            string commandText = @"INSERT INTO `meeting`
                (profile_id, meeting_date, content, status)
                VALUES(@profileId, @meetingDate, @content, @status)";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@profileId", meeting.ProfileId);
            parameters.Add("@meetingDate", meeting.Date);
            parameters.Add("@content", meeting.Content);
            parameters.Add("@status", Status.Active);
            return await this._databaseRepository.ExecuteUpdate(
                commandText, parameters, true);
        }

        public async Task<bool> UpdateMeetingAsync(MeetingViewModel meeting)
        {
            if (meeting == null)
            {
                return false;
            }

            string commandText = @"UPDATE `meeting`
                SET meeting_date = @meetingDate,
                content = @content
                WHERE id = @id
                AND profile_id = @profileId";
            var parameters = new Dictionary<string, object>();
            parameters.Add("@id", meeting.Id);
            parameters.Add("@profileId", meeting.ProfileId);
            parameters.Add("@meetingDate", meeting.Date);
            parameters.Add("@content", meeting.Content);
            return await this._databaseRepository.ExecuteUpdate(
                commandText, parameters, false) == 1;
        }

        private void ReadMeetingList(DbDataReader reader, List<MeetingViewModel> meetings)
        {
            meetings.Add(this.ReadMeeting(reader));
        }

        private MeetingViewModel ReadMeeting(DbDataReader reader)
        {
            var meeting = new MeetingViewModel();
            meeting.Id = reader.GetInt32(reader.GetOrdinal("id"));
            meeting.Name =
                $"{reader.GetString(reader.GetOrdinal("firstname"))} {reader.GetString(reader.GetOrdinal("lastname"))}";
            meeting.Content = reader.GetString(reader.GetOrdinal("content"));
            meeting.ProfileId = reader.GetInt32(reader.GetOrdinal("profile_id"));
            meeting.Date = reader.GetDateTime(reader.GetOrdinal("meeting_date"));
            meeting.Status = (Status)reader.GetInt32(reader.GetOrdinal("status"));
            return meeting;
        }
    }
}