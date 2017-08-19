import * as React from 'react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';

import { ProfileEditProps } from '../models/profile';
import { ProfileDetail } from './profile-detail';

export class Page extends React.Component<ProfileEditProps, ProfileEditProps> {

    constructor(props: any) {
        super(props);
        this.state = props;
    }

    render(): JSX.Element {
        const match = this.props.match;
        let url = '/profiles/manage';
        let back = 'Back';
        let id: number = match.params.id;

        let element = (<div>Unexpected</div>);
        if (match) {
            element = (
                <div>
                    <ProfileDetail id={id} />
                </div>
            );
        }

        let content = (
            <div className='row'>
                <Link to={url} title={back}>
                    <span className='glyphicon glyphicon-hand-left'></span> {back}
                </Link>
                {element}
            </div>);

        return content;
    }
}