import * as React from 'react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';

import { Profile, Position, ProfileEditProps, Characteristic, Skill } from '../models/profile';
import { ProfileDetail } from './profile-detail';
import { ProfileCharacteristic } from './profile-characteristic';
import { ProfileSkill } from './profile-skill';
import { ProfileHelper } from '../profile-helper';
import Util from '../../../../utils/util';

export class Page extends React.Component<ProfileEditProps, ProfileEditProps> {
    private profileHelper: ProfileHelper = new ProfileHelper();

    constructor(props: any) {
        super(props);
        this.state = props;
    }

    componentDidMount() {
        const match = this.props.match;
        const id: number = match.params.id;
        fetch('/profile/' + id)
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed');
                }
                return response;
            })
            .then(d => d.json())
            .then(d => {
                const positions: Array<Position> = d.positions;
                const allCharacteristics: Array<Characteristic> = d.allCharacteristics;
                const allSkills: Array<Skill> = d.allSkills;
                const profile = this.profileHelper.toViewModel(d.profile, positions);
                this.setState({
                    profile: profile,
                    positions: positions,
                    allCharacteristics: allCharacteristics,
                    allSkills: allSkills
                });
            }, () => {
                this.setState({
                    requestFailed: true
                });
            });
    }

    handleSave = () => {
        if (this.state.isSaving) {
            return;
        }

        this.setState({
            isSaving: true,
            saveResult: ''
        });
        const profile = {
            id: this.state.profile.id,
            firstName: this.state.profile.firstName,
            lastName: this.state.profile.lastName,
            position: this.state.profile.position,
            startDate: Util.toUTC(this.state.profile.startDate),
            status: this.state.profile.status,
            characteristics: this.state.profile.characteristics,
            skills: this.state.profile.skills
        };
        fetch('/profile/' + profile.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile)
        })
            .then(response => {
                if (!response.ok) {
                    this.setState({
                        saveResult: 'Failed',
                        isSaving: false
                    });
                }
                return response;
            })
            .then(response => response.text())
            .then(response => {
                if (profile.id === 0) {
                    const inserted: number = parseInt(response);
                    if (inserted > 0) {
                        this.state.profile.id = inserted;
                        this.setState({
                            saveResult: 'Success',
                            isSaving: false
                        });
                    }
                } else {
                    this.setState({
                        saveResult: 'Success',
                        isSaving: false
                    });
                }
            }, () => {
                this.setState({
                    saveResult: 'Failed',
                    isSaving: false
                });
            });
    }


    render(): JSX.Element {
        const match = this.props.match;
        const url = '/profiles/manage';
        const back = 'Back';
        const id: number = match.params.id;

        let element = (<div>Loading...</div>);
        let characteristicElement = (<div />);
        let skillElement = (<div />);
        if (this.state.requestFailed) element = <p>Failed!</p>;
        if (this.state.profile) {
            if (match) {
                element = (
                    <ProfileDetail id={id}
                        profile={this.state.profile}
                        positions={this.state.positions} />
                );
                characteristicElement = (
                    <ProfileCharacteristic id={id}
                        profile={this.state.profile}
                        showModal={false}
                        allCharacteristics={this.state.allCharacteristics}
                    />
                );
                skillElement = (
                    <ProfileSkill id={id}
                        allSkills={this.state.allSkills}
                        showModal={false}
                        profile={this.state.profile} />
                );
            }
        }
        const saveElement = (
            <button className='btn btn-default'
                onClick={this.handleSave}
                title='Save'>
                <span className='glyphicon glyphicon-save'></span> Save
            </button>
        );


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
                <div className='row'>
                    <div className='col-md-6 col-md-offset-3'>
                        {saveElement} {this.state.saveResult}
                    </div>
                </div>
            </div>);

        return content;
    }
}