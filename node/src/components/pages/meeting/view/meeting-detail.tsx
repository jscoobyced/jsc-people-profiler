import * as React from 'react';
import { MeetingDetailProps, Meeting } from '../models/meeting';
import { ProfileHelper } from '../../profiles/profile-helper';
import { Profile, Position } from '../../profiles/models/profile';
import Util from '../../../../utils/util';

export class MeetingDetail extends React.Component<MeetingDetailProps, MeetingDetailProps> {

    constructor(props: MeetingDetailProps) {
        super(props);
        this.state = props;
    }

    componentDidMount() {
        fetch('/profiles')
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed');
                }
                return response;
            })
            .then(data => data.json())
            .then(data => {
                const profiles: Array<Profile> = data.profiles;
                const positions: Array<Position> = data.positions;
                new ProfileHelper().toViewModels(profiles, positions);
                this.setState({
                    profiles: profiles
                });
            }, () => {
                this.setState({
                    requestFailed: true
                });
            });
    }

    handleDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const meeting = this.state.meeting;
        if (event.currentTarget.id === 'meeting-date') {
            meeting.date = new Date(event.currentTarget.value);
        }
        this.setState({
            meeting: meeting
        });
    }

    handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const meeting = this.state.meeting;
        if (event.currentTarget.id === 'meeting-notes') {
            meeting.content = event.currentTarget.value;
        }
        this.setState({
            meeting: meeting
        });
    }
    
    handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const meeting = this.state.meeting;
        if (event.currentTarget.id === 'profile') {
            meeting.profileId = Number(event.currentTarget.value);
        }
        this.setState({
            meeting: meeting
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
        const meeting: Meeting = {
            id: this.state.meeting.id,
            name: this.state.meeting.name,
            content: this.state.meeting.content,
            profileId: this.state.meeting.profileId,
            date: Util.toUTC(this.state.meeting.date)
        };

        fetch('/meeting/' + meeting.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meeting)
        })
            .then(response => {
                Util.handleNetworkResponse(response);
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
                if (meeting.id === 0) {
                    const inserted: number = parseInt(response);
                    if (inserted > 0) {
                        this.state.meeting.id = inserted;
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
            }, (reason) => {
                this.setState({
                    saveResult: reason.message,
                    isSaving: false
                });
            });
    }

    render(): JSX.Element {
        let response = <p>Loading...</p>;
        if (this.state.requestFailed) response = <p>Failed!</p>;
        if (this.state.profiles) {
            const meeting = this.state.meeting;
            const meetingDate = Util.toYYYYMMDDHHMMSS(meeting.date);
            const meetingDateElement = (
                <div className='col-md-4'>
                    <div className='input-group'>
                        <label htmlFor='meeting-date' className='sr-only'>Meeting Date</label>
                        <span className='input-group-addon' title='Meeting Date'>
                            <i className='glyphicon glyphicon-calendar'></i>
                        </span>
                        <input type='datetime-local' id='meeting-date' value={meetingDate}
                            onChange={this.handleDateChange}
                            className='form-control' placeholder='Enter meeting date' />
                    </div>
                </div>
            );
            const meetingNotesElement: JSX.Element = (
                <div className='col-md-8'>
                    <div className='input-group'>
                        <label htmlFor='meeting-notes' className='sr-only'>Meeting Notes</label>
                        <textarea id='meeting-notes' cols={120} rows={10}
                            value={meeting.content} onChange={this.handleTextChange}
                            className='form-control' placeholder='Enter meeting notes' />
                    </div>
                </div>
            );
            const profiles = this.state.profiles;
            const profileElement = (
                <div className='col-md-3'>
                    <div className='input-group'>
                        <label htmlFor='profile' className='sr-only'>Profile</label>
                        <span className='input-group-addon' title='Position'>
                            <i className='glyphicon glyphicon-briefcase'></i>
                        </span>
                        <select id='profile' value={meeting.profileId}
                            onChange={this.handleSelect}
                            className='form-control'>
                            {
                                profiles.map(function (profile, key) {
                                    return <option key={key}
                                        value={profile.id}>{profile.firstName} {profile.lastName}</option>;
                                })
                            }
                        </select>
                    </div>
                </div>
            );
            const topLine: JSX.Element = (
                <div className='row'>
                    <h2><span>Meeting notes</span></h2>
                    {profileElement}
                </div>
            );

            const inputForm: JSX.Element = (
                <div className='row'>
                    {meetingDateElement}
                    {meetingNotesElement}
                </div>
            );
            const saveElement = (
                <button className='btn btn-default save-button'
                    onClick={this.handleSave}
                    title='Save'>
                    <span className='glyphicon glyphicon-save'></span> Save
            </button>
            );
            response = (
                <div className='col-md-10 col-md-offset-1'>
                    {topLine}
                    {inputForm}
                    <div className='row'>
                        {saveElement} {this.state.saveResult}
                    </div>
                </div>);
        }
        return response;
    }
}