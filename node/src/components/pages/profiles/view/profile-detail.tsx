import * as React from 'react';
import { Link } from 'react-router-dom';

import { ProfileDetailProps } from '../models/profile';
import Util from '../../../../utils/util';
import { Profile } from '../models/profile';
import { Position } from '../models/profile';
import { ProfileHelper } from '../profile-helper';

export class ProfileDetail extends React.Component<ProfileDetailProps, ProfileDetailProps> {
    private profileHelper: ProfileHelper = new ProfileHelper();

    constructor(props: ProfileDetailProps) {
        super(props);
        this.state = props;
    }

    componentDidMount() {
        fetch('/profile/getprofileasync/' + this.props.id)
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed');
                }
                return response;
            })
            .then(d => d.json())
            .then(d => {
                const positions: Array<Position> = d.positions;
                const profile = this.profileHelper.toViewModel(d.profile, positions);
                this.setState({
                    profile: profile,
                    positions: positions
                });
            }, () => {
                this.setState({
                    requestFailed: true
                });
            });
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
            status: this.state.profile.status
        };
        fetch('/profile/updateprofileasync/' + profile.id, {
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
        let response = <p>Loading...</p>;
        const saveElement = (
            <Link className='btn btn-default'
                onClick={this.handleSave}
                to='#'
                title='Save'>
                <span className='glyphicon glyphicon-save'></span> Save
            </Link>
        );

        if (this.state.requestFailed) response = <p>Failed!</p>;
        if (this.state.profile) {
            const profile = this.state.profile;
            const positions = this.state.positions;
            const startDate = Util.toYYYYMMDD(profile.startDate);
            const firstName = (
                <div className='col-md-6'>
                    <div className='input-group'>
                        <label htmlFor='firstname' className='sr-only'>Firstname</label>
                        <span className='input-group-addon'>
                            <i className='glyphicon glyphicon-font'></i></span>
                        <input type='text' id='firstname' value={profile.firstName}
                            onChange={this.handleChange} required
                            className='form-control' placeholder='Enter firstname' />
                    </div>
                </div>
            );
            const lastName = (
                <div className='col-md-6'>
                    <div className='input-group'>
                        <label htmlFor='lastname' className='sr-only'>Lastname</label>
                        <span className='input-group-addon'>
                            <i className='glyphicon glyphicon-font'></i></span>
                        <input type='text' id='lastname' value={profile.lastName}
                            onChange={this.handleChange} required
                            className='form-control' placeholder='Enter lastname' />
                    </div>
                </div>
            );
            const startDateElement = (
                <div className='col-md-6'>
                    <div className='input-group'>
                        <label htmlFor='start-date' className='sr-only'>Start Date</label>
                        <span className='input-group-addon'>
                            <i className='glyphicon glyphicon-calendar'></i></span>
                        <input type='date' id='start-date' value={startDate}
                            onChange={this.handleChange}
                            className='form-control' placeholder='Enter start date' />
                    </div>
                </div>
            );
            const position = (
                <div className='col-md-6'>
                    <div className='input-group'>
                        <label htmlFor='position' className='sr-only'>Position</label>
                        <span className='input-group-addon'>
                            <i className='glyphicon glyphicon-user'></i></span>
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
                        <div className='col-md-6 col-md-offset-3'>
                            {profile.firstName &&
                                <div className='row'>
                                    <h2>{profile.firstName} {profile.lastName}'s Profile</h2>
                                </div>
                            }
                            <div className='row'>
                                {firstName}
                                {lastName}
                            </div>
                            <div className='row'>
                                {startDateElement}
                                {position}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-md-offset-3'>
                            {saveElement} {this.state.saveResult}
                        </div>
                    </div>
                </div>
            );
        }

        return response;
    }
}