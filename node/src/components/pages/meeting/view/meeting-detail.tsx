import * as React from 'react';
import { MeetingDetailProps, Meeting } from '../models/meeting';

export class MeetingDetail extends React.Component<MeetingDetailProps, MeetingDetailProps> {

    constructor(props: MeetingDetailProps) {
        super(props);
        this.state = props;
    }

    render(): JSX.Element {
        const meeting = this.state.meeting;
        const topLine: JSX.Element = (<h2><span>Meeting notes for {meeting.name}.</span></h2>);
        const inputForm: JSX.Element = (
            
        );
        return (<div>
            <div className='row'>
                <div className='col-md-10 col-md-offset-1'>
                    {topLine}
                </div>
            </div>
        </div>);
    }
}