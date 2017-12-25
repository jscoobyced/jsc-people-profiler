import * as React from 'react';
import { Link, match } from 'react-router-dom';

import { PageProps } from '../../page-models';
import { MeetingProps, Meeting } from '../models/meeting';
import { MeetingDetail } from './meeting-detail';

export class EditMeeting extends React.Component<PageProps, MeetingProps> {

    constructor(props: any) {
        super(props);
        this.state = props;
    }

    componentDidMount() {
        const match = this.props.match;
        const id: number = match.params.id;
        fetch('/meeting/' + id)
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed');
                }
                return response;
            })
            .then(d => d.json())
            .then(d => {
                this.setState({
                    meeting: d,
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
    }

    render(): JSX.Element {
        const match = this.props.match;
        const url = '/meeting/manage';
        const back = 'Back';
        const id: number = match.params.id;

        let element = (<span>Loading...</span>);

        const saveElement = (
            <button className='btn btn-default save-button'
                onClick={this.handleSave}
                title='Save'>
                <span className='glyphicon glyphicon-save'></span> Save
            </button>
        );
        if (this.state.requestFailed) element = <p>Failed!</p>;
        if (this.state.meeting) {
            if (match) {
                element = (
                    <MeetingDetail meeting={this.state.meeting}/>
                );
            }
        }

        const content = (
            <div>
                <div className='row'>
                    <Link to={url} title={back}>
                        <div className='glyphicon glyphicon-hand-left'></div> {back}
                    </Link>
                </div>
                {element}
                {saveElement} {this.state.saveResult}
            </div>);

        return content;
    }
}