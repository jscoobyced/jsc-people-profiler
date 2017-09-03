import * as React from 'react';
import { ProfileProps } from '../models/profile';
import { Link } from 'react-router-dom';
import Util from '../../../../utils/util';

export class ProfileRow extends React.Component<ProfileProps, ProfileProps> {
    constructor(props: ProfileProps) {
        super(props);
        this.state = props;
    }

    render(): JSX.Element {
        const rows = this.state.profiles.map((profile, key) => {
            const url = this.state.baseUrl + '/' + profile.id;
            const edit = 'Edit';
            const title = edit + ' ' + profile.firstName;
            const startDate = Util.toYYYYMMDD(profile.startDate);

            return (
                <tr key={key}>
                    <td>{profile.id}</td>
                    <td>{profile.firstName}</td>
                    <td>{profile.lastName}</td>
                    <td>{profile.positionName}</td>
                    <td>{startDate}</td>
                    <td>
                        <Link className='btn btn-default' to={url} title={title}>
                            <span className='glyphicon glyphicon-edit'></span> {edit}
                        </Link>
                    </td>
                </tr>
            );
        });

        return (
            <tbody>{rows}</tbody>
        );
    }
}