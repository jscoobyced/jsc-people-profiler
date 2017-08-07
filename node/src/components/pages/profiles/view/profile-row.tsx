import * as React from 'react';
import { ProfileProps } from '../models/profile';
import { Link } from 'react-router-dom';

export class ProfileRow extends React.Component<ProfileProps, ProfileProps> {
    constructor(props: ProfileProps) {
        super(props);
        this.state = props;
    }

    render(): JSX.Element {
        let rows = this.state.profiles.map((profile, key) => {
            let url = this.state.baseUrl + '/' + profile.id;
            let edit = 'Edit';
            let title = edit + ' ' + profile.firstName;
            return (
                <tr key={key}>
                    <td>{profile.id}</td>
                    <td>{profile.firstName}</td>
                    <td>{profile.lastName}</td>
                    <td>{profile.startDate}</td>
                    <td><Link to={url} title={title}>{edit}</Link></td>
                </tr>
            );
        });

        return (
            <tbody>{rows}</tbody>
        );
    }
}