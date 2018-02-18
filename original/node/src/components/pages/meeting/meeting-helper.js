var MeetingHelper = (function () {
    function MeetingHelper() {
    }
    MeetingHelper.prototype.toViewModel = function (meeting) {
        if (meeting == null) {
            meeting = {
                id: 0,
                content: '',
                date: new Date(),
                name: '',
                profileId: 0
            };
        }
        meeting.date = new Date(meeting.date);
        if (!meeting.content) {
            meeting.content = '';
        }
        return meeting;
    };
    MeetingHelper.prototype.toViewModels = function (meetings) {
        var _this = this;
        meetings.map(function (meeting) {
            meeting = _this.toViewModel(meeting);
        });
        return meetings;
    };
    return MeetingHelper;
}());
export { MeetingHelper };
//# sourceMappingURL=meeting-helper.js.map