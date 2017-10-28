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
    characteristics?: Array<Characteristic>;
}

export interface Position {
    id: number;
    name: string;
}

export interface Skill {
    id: number;
    name: string;
    score: number;
}

export interface Characteristic {
    id: number;
    name: string;
}

export interface ProfileProps {
    profiles: Array<Profile>;
    baseUrl: string;
}

export interface ProfileEditProps {
    id: number;
    required: string;
    match?: match<IdParam>;
    profile?: Profile;
    requestFailed?: boolean;
    positions?: Array<Position>;
    allSkills?: Array<Skill>;
    allCharacteristics?: Array<Characteristic>;
    skills?: Array<Skill>;
    saveResult?: string;
    isSaving?: boolean;
}

export interface ProfileDetailProps {
    id: number;
    profile?: Profile;
    requestFailed?: boolean;
    positions?: Array<Position>;
    skills?: Array<Skill>;
    allSkills?: Array<Skill>;
    allCharacteristics?: Array<Characteristic>;
    showCharacteristicsModal?: boolean;
    selectedCharacteristic?: number;
}