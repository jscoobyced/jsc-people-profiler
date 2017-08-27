import { Profile } from './models/profile';
import { Position } from './models/profile';

export class ProfileHelper {
    toViewModel(profile: Profile, positions: Array<Position>): void {
        profile.startDate = new Date(profile.startDate);
        positions.forEach(position => {
            if (position.id === profile.position) {
                profile.positionName = position.name;
            }
        });
    }

    toViewModels = (profiles: Array<Profile>, positions: Array<Position>): void => {
        profiles.map((profile) => {
            this.toViewModel(profile, positions);
        });
    }
}