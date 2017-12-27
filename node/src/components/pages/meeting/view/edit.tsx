import * as React from 'react';
import { Link, match } from 'react-router-dom';

import Util from '../../../../utils/util';
import { PageProps } from '../../page-models';
import { MeetingProps, Meeting } from '../models/meeting';
import { MeetingDetail } from './meeting-detail';
import { MeetingHelper } from '../meeting-helper';

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
                Util.handleNetworkResponse(response);
                if (!response.ok) {
                    throw Error('Network request failed');
                }
                return response;
            })
            .then(d => d.json())
            .then(d => {
                this.setState({
                    meeting: new MeetingHelper().toViewModel(d),
                });
            }, () => {
                this.setState({
                    requestFailed: true
                });
            });
    }

    render(): JSX.Element {
        const match = this.props.match;
        const url = '/meeting/manage';
        const back = 'Back';
        const id: number = match.params.id;

        let element = (<span>Loading...</span>);
        if (this.state.requestFailed) element = <p>Failed!</p>;
        if (this.state.meeting) {
            if (match) {
                element = (
                    <MeetingDetail meeting={this.state.meeting} />
                );
            }
        }

        const content = (
            <div className='container row'>
                <div className='row'>
                    <Link to={url} title={back}>
                        <div className='glyphicon glyphicon-hand-left'></div> {back}
                    </Link>
                </div>
                {element}
            </div>);

        return content;
    }
}