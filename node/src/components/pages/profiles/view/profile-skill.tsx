import * as React from 'react';
import { ProfileDetailProps } from '../models/profile';

export class ProfileSkill extends React.Component<ProfileDetailProps, ProfileDetailProps> {

    constructor(props: ProfileDetailProps) {
        super(props);
        this.state = props;
    }

    render(): JSX.Element {
        return (
            <div className='row'>
                <h2>Skills</h2>
                <ul>
                    {this.state.skills.map((skill, key) => {
                        return (
                            <li key={key}>{skill.name}: {skill.score} / 5</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}