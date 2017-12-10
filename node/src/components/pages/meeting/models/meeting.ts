export interface Meeting {
    id: number;
    name: string;
    date: Date;
}

export interface MeetingProps {
    baseUrl: string;
    requestFailed?: boolean;
    meetings?: Array<Meeting>;
}