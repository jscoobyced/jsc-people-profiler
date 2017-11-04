import * as React from 'react';

import { ProfileDetailProps } from '../models/profile';
import Util from '../../../../utils/util';
import { Profile, Position, Characteristic } from '../models/profile';

export class ProfileDetail extends React.Component<ProfileDetailProps, ProfileDetailProps> {
    constructor(props: ProfileDetailProps) {
        super(props);
        this.state = props;
    }

    handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const profile = this.state.profile;
        if (event.currentTarget.id === 'position') {
            profile.position = Number(event.currentTarget.value);
        }
        this.setState({
            profile: profile
        });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const profile = this.state.profile;
        if (event.currentTarget.id === 'firstname') {
            profile.firstName = event.currentTarget.value;
        }
        if (event.currentTarget.id === 'lastname') {
            profile.lastName = event.currentTarget.value;
        }
        if (event.currentTarget.id === 'start-date') {
            profile.startDate = new Date(event.currentTarget.value);
        }
        this.setState({
            profile: profile
        });
    }

    render(): JSX.Element {
        let response = <p>Loading...</p>;
        if (this.state.profile) {
            const profile = this.state.profile;
            const positions = this.state.positions;
            const startDate = Util.toYYYYMMDD(profile.startDate);
            const firstName = (
                <div className='col-md-3'>
                    <div className='input-group'>
                        <label htmlFor='firstname' className='sr-only'>Firstname</label>
                        <span className='input-group-addon' title='Firstname'>
                            <i className='glyphicon glyphicon-font'></i>
                        </span>
                        <input type='text' id='firstname' value={profile.firstName}
                            onChange={this.handleChange} required
                            className='form-control' placeholder='Enter firstname' />
                    </div>
                </div>
            );
            const lastName = (
                <div className='col-md-3'>
                    <div className='input-group'>
                        <label htmlFor='lastname' className='sr-only'>Lastname</label>
                        <span className='input-group-addon' title='Lastname'>
                            <i className='glyphicon glyphicon-font'></i>
                        </span>
                        <input type='text' id='lastname' value={profile.lastName}
                            onChange={this.handleChange} required
                            className='form-control' placeholder='Enter lastname' />
                    </div>
                </div>
            );
            const startDateElement = (
                <div className='col-md-3'>
                    <div className='input-group'>
                        <label htmlFor='start-date' className='sr-only'>Start Date</label>
                        <span className='input-group-addon' title='Start Date'>
                            <i className='glyphicon glyphicon-calendar'></i>
                        </span>
                        <input type='date' id='start-date' value={startDate}
                            onChange={this.handleChange}
                            className='form-control' placeholder='Enter start date' />
                    </div>
                </div>
            );
            const position = (
                <div className='col-md-3'>
                    <div className='input-group'>
                        <label htmlFor='position' className='sr-only'>Position</label>
                        <span className='input-group-addon' title='Position'>
                            <i className='glyphicon glyphicon-briefcase'></i>
                        </span>
                        <select id='position' value={profile.position}
                            onChange={this.handleSelect}
                            className='form-control'>
                            {
                                positions.map(function (position, key) {
                                    return <option key={key}
                                        value={position.id}>{position.name}</option>;
                                })
                            }
                        </select>
                    </div>
                </div>
            );

            response = (
                <div>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1'>
                            <div className='row'>
                                <h2>
                                    {(profile.firstName || profile.lastName) &&
                                        <span>{profile.firstName} {profile.lastName}'s Profile</span>
                                    }
                                    {!(profile.firstName || profile.lastName) &&
                                        <span>Create Profile</span>
                                    }
                                </h2>
                            </div>
                            <div className='row tall'>
                                {firstName}
                                {lastName}
                                {startDateElement}
                                {position}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return response;
    }
}