import * as React from 'react';
import { PageProps } from '../../page-models';
import { ProfileProps } from '../models/profile';
import { ProfileRow } from './profile-row';
import { Profile } from '../models/profile';
import { Position } from '../models/profile';
import { ProfileHelper } from '../profile-helper';

export class Page extends React.Component<PageProps, any> {
    private profileHelper: ProfileHelper = new ProfileHelper();

    constructor(props: any) {
        super(props);
        this.state = {
            name: this.props.name
        };
    }

    componentDidMount() {
        fetch('/profile/getprofilesasync')
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed');
                }
                return response;
            })
            .then(d => d.json())
            .then(d => {
                let profiles: Array<Profile> = d.profiles;
                let positions: Array<Position> = d.positions;
                this.profileHelper.toViewModels(profiles, positions);
                this.setState({
                    data: profiles
                });
            }, () => {
                this.setState({
                    requestFailed: true
                });
            });
    }

    render(): JSX.Element {
        let response = <p>Loading...</p>;
        if (this.state.requestFailed) response = <p>Failed!</p>;
        if (this.state.data) {
            response = (
                <div className='row'>
                    <div className='col-md-8 col-md-offset-2'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Position</th>
                                    <th>Start Date</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <ProfileRow baseUrl='/profiles/edit' profiles={this.state.data} />
                        </table>
                    </div>
                </div>
            );
        }
        return response;
    }
}