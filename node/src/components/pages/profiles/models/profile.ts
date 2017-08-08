import { match } from 'react-router-dom';
import { IdParam } from '../../page-models';

export interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    startDate: number;
}

export interface ProfileProps {
    profiles: Array<Profile>;
    baseUrl: string;
}

export interface ProfileEditProps {
    required: string;
    match?: match<IdParam>;
}