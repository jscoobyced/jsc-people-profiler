import { Meeting } from './models/meeting';

export class MeetingHelper {
    toViewModel(meeting: Meeting): Meeting {
        if (meeting == null) {
            meeting = {
                id: 0,
                content: '',
                date: new Date(),
                name: '',
                employeeId: 0
            };
        }

        meeting.date = new Date(meeting.date);
        return meeting;
    }

    toViewModels(meetings: Array<Meeting>): Array<Meeting> {
        meetings.map(meeting => {
            meeting = this.toViewModel(meeting);
        });
        return meetings;
    }
}