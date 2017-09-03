import { Profile } from './models/profile';
import { Position } from './models/profile';

export class ProfileHelper {
    toViewModel(profile: Profile, positions: Array<Position>): Profile {
        if (profile == null) {
            profile = {
                id: 0,
                firstName: '',
                lastName: '',
                startDate: new Date(),
                position: 1,
                status: 1
            };
        }
        profile.startDate = new Date(profile.startDate);
        positions.forEach(position => {
            if (position.id === profile.position) {
                profile.positionName = position.name;
            }
        });

        return profile;
    }

    toViewModels = (profiles: Array<Profile>, positions: Array<Position>): Array<Profile> => {
        profiles.map((profile) => {
            profile = this.toViewModel(profile, positions);
        });

        return profiles;
    }
}