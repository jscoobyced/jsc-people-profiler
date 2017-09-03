import { match } from 'react-router-dom';
import { IdParam } from '../../page-models';

export interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    startDate: Date;
    position: number;
    positionName?: string;
    status: number;
}

export interface Position {
    id: number;
    name: string;
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
    positions?: Array<Position>;
    requestFailed?: boolean;
    saveResult?: string;
    isSaving?: boolean;
}