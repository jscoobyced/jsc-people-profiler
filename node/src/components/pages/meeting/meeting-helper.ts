import { Meeting } from './models/meeting';

export class MeetingHelper {
    toViewModel(meeting: Meeting): Meeting {
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
        if(!meeting.content) {
            meeting.content = '';
        }
        return meeting;
    }

    toViewModels(meetings: Array<Meeting>): Array<Meeting> {
        meetings.map(meeting => {
            meeting = this.toViewModel(meeting);
        });
        return meetings;
    }
}