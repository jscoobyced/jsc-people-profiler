import * as React from 'react';
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
                let profile: Profile = d.profile;
                let positions: Array<Position> = d.positions;
                this.profileHelper.toViewModel(profile, positions);
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
        let profile = this.state.profile;
        if (event.currentTarget.id === 'position') {
            profile.position = Number(event.currentTarget.value);
        }
        this.setState({
            profile: profile
        });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let profile = this.state.profile;
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
        if (this.state.requestFailed) response = <p>Failed!</p>;
        if (this.state.profile) {
            let profile = this.state.profile;
            let positions = this.state.positions;
            let startDate = Util.toYYYYMMDD(profile.startDate);
            response = (
                <div className='col-md-6 col-md-offset-3'>
                    <div className='row'>
                        <h2>{profile.firstName} {profile.lastName}'s Profile</h2>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='input-group'>
                                <label htmlFor='firstname' className='sr-only'>Firstname</label>
                                <span className='input-group-addon'>
                                    <i className='glyphicon glyphicon-font'></i></span>
                                <input type='text' id='firstname' value={profile.firstName}
                                    onChange={this.handleChange}
                                    className='form-control' placeholder='Enter firstname' />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='input-group'>
                                <label htmlFor='lastname' className='sr-only'>Lastname</label>
                                <span className='input-group-addon'>
                                    <i className='glyphicon glyphicon-font'></i></span>
                                <input type='text' id='lastname' value={profile.lastName}
                                    onChange={this.handleChange}
                                    className='form-control' placeholder='Enter lastname' />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
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
                    </div>
                </div>);
        }

        return response;
    }
}