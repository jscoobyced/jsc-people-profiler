import * as React from 'react';
import { Link } from 'react-router-dom';
import { MeetingProps, Meeting } from '../models/meeting';
import Util from '../../../../utils/util';

export class MeetingRow extends React.Component<MeetingProps, MeetingProps> {
    constructor(props: MeetingProps) {
        super(props);
        this.state = props;
    }

    render(): JSX.Element {
        const rows = this.state.meetings.map((meeting, key) => {
            const url = this.state.baseUrl + '/' + meeting.id;
            const id = meeting.id;
            const name = meeting.name;
            const edit = 'Edit';
            const title = edit + ' meeting notes with ' + meeting.name;
            const meetingDate = Util.toYYYYMMDD(meeting.date);

            return (
                <tr key={key}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{meetingDate}</td>
                    <td><Link className='btn btn-default' to={url} title={title}>
                        <span className='glyphicon glyphicon-edit'></span> {edit}
                    </Link></td>
                </tr>
            );
        });

        return (
            <tbody>{rows}</tbody>
        );
    }
}