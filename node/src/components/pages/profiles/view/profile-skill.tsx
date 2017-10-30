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
                {this.state.profile.skills.map((skill, key) => {
                    const maxScore = 5;
                    const percent = (100 * skill.score / 5);
                    const style = {
                        width: percent + '%'
                    };
                    const status = ['success', 'danger', 'warning', 'info', 'success'];
                    const progressCurrentClass = status[skill.score % maxScore];
                    const progressClass = 'progress-bar progress-bar-' + progressCurrentClass;
                    return (
                        <div className='progress' key={key}>
                            <div className={progressClass}
                                role='progressbar' aria-valuenow={skill.score}
                                style={style}
                                aria-valuemin='0' aria-valuemax={maxScore}>
                                {skill.name}: {skill.score}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}