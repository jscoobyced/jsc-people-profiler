import * as React from 'react';
import { PageProps } from '../../page-models';
import { ProfileProps } from '../models/profile';
import { ProfileRow } from './profile-row';

export class Page extends React.Component<PageProps, any> {
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
                this.setState({
                    data: d
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
                                    <th>Start Date</th>
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