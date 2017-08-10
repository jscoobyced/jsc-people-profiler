import * as React from 'react';
import { ProfileEditProps } from '../models/profile';
import { match } from 'react-router';

export class Page extends React.Component<ProfileEditProps, ProfileEditProps> {
    constructor(props: any) {
        super(props);
        this.state = props;
    }

    render(): JSX.Element {
        const match = this.props.match;
        if (match) {
            return (
                <div className='row'>
                    Yeepee: {match.params.id}
                </div>
            );
        } else {
            return (
                <div className='row'>
                    Booh ooh oooooh...
            </div>);
        }
    }
}