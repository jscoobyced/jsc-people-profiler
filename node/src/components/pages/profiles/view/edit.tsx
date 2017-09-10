import * as React from 'react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';

import { ProfileEditProps, Characteristic, Skill } from '../models/profile';
import { ProfileDetail } from './profile-detail';
import { ProfileCharacteristic } from './profile-characteristic';
import { ProfileSkill } from './profile-skill';

export class Page extends React.Component<ProfileEditProps, ProfileEditProps> {

    constructor(props: any) {
        super(props);
        this.state = props;
    }

    render(): JSX.Element {
        const match = this.props.match;
        const url = '/profiles/manage';
        const back = 'Back';
        const id: number = match.params.id;

        let element = (<div>Unexpected</div>);
        let characteristicElement = (<div />);
        let skillElement = (<div />);
        if (match) {
            element = (
                <ProfileDetail id={id} />
            );
            const characteristics = new Array<Characteristic>();
            characteristics.push({ id: 1, name: 'Strong' });
            characteristics.push({ id: 2, name: 'Friendly' });
            const allCharacteristics = new Array<Characteristic>();
            allCharacteristics.push({ id: 0, name: 'Select characteristic' });
            allCharacteristics.push({ id: 1, name: 'Strong' });
            allCharacteristics.push({ id: 2, name: 'Friendly' });
            allCharacteristics.push({ id: 3, name: 'Smart' });
            characteristicElement = (
                <ProfileCharacteristic id={id}
                    characteristics={characteristics}
                    allCharacteristics={allCharacteristics}
                />
            );
            const skills = new Array<Skill>();
            skills.push({ id: 1, name: 'C#', score: 4 });
            skills.push({ id: 2, name: 'Java', score: 2 });
            skills.push({ id: 3, name: 'CSS', score: 3 });
            skills.push({ id: 4, name: 'HTML', score: 1 });
            skills.push({ id: 5, name: 'Software Architecture', score: 5 });
            skillElement = (
                <ProfileSkill id={id} skills={skills} />
            );
        }

        const content = (
            <div>
                <div className='row'>
                    <Link to={url} title={back}>
                        <span className='glyphicon glyphicon-hand-left'></span> {back}
                    </Link>
                </div>
                {element}
                <div className='col-md-4 col-md-offset-1'>
                    {characteristicElement}
                </div>
                <div className='col-md-4 col-md-offset-1'>
                    {skillElement}
                </div>
            </div>);

        return content;
    }
}