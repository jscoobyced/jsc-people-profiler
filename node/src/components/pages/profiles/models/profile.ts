export interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    startDate: string;
}

export interface ProfileProps {
    profiles: Array<Profile>;
    baseUrl: string;
}