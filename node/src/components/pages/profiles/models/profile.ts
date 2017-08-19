import { match } from 'react-router-dom';
import { IdParam } from '../../page-models';

export interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    startDate: Date;
    position: string;
    status: number;
}

export interface ProfileProps {
    profiles: Array<Profile>;
    baseUrl: string;
}

export interface ProfileEditProps {
    required: string;
    match?: match<IdParam>;
}

export interface ProfileDetailProps {
    id: number;
    profile?: Profile;
    requestFailed?: boolean;
}