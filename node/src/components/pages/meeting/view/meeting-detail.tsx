import * as React from 'react';
import { MeetingDetailProps, Meeting } from '../models/meeting';
import Util from '../../../../utils/util';

export class MeetingDetail extends React.Component<MeetingDetailProps, MeetingDetailProps> {

    constructor(props: MeetingDetailProps) {
        super(props);
        this.state = props;
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
            employeeId: this.state.meeting.employeeId,
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
        const meeting = this.state.meeting;
        const meetingDate = Util.toYYYYMMDDHHMMSS(meeting.date);
        const topLine: JSX.Element = (
            <div className='row'>
                <h2><span>Meeting notes for {meeting.name}.</span></h2>
            </div>
        );
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
        return (
            <div className='col-md-10 col-md-offset-1'>
                {topLine}
                {inputForm}
                <div className='row'>
                    {saveElement} {this.state.saveResult}
                </div>
            </div>);
    }
}