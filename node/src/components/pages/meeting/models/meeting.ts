export interface Meeting {
    id: number;
    employeeId: number;
    name: string;
    date: Date;
    content?: string;
}

export interface MeetingProps {
    baseUrl: string;
    requestFailed?: boolean;
    meetings?: Array<Meeting>;
    meeting?: Meeting;
}

export interface MeetingDetailProps {
    meeting: Meeting;
    isSaving?: boolean;
    saveResult?: string;
}