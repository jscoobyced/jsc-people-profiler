export interface Meeting {
    id: number;
    name: string;
    date: Date;
    content?: string;
}

export interface MeetingProps {
    baseUrl: string;
    requestFailed?: boolean;
    meetings?: Array<Meeting>;
    isSaving?: boolean;
    meeting?: Meeting;
    saveResult?: string;
}

export interface MeetingDetailProps {
    meeting: Meeting;
}