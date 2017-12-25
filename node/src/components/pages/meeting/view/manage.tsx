import * as React from 'react';
import { Link } from 'react-router-dom';

import { PageProps } from '../../page-models';
import { MeetingProps, Meeting } from '../models/meeting';
import { MeetingRow } from './manage-row';

export class Page extends React.Component<PageProps, MeetingProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            baseUrl: this.props.url
        };
    }

    componentDidMount() {
        fetch('/profiles')
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed');
                }
                return response;
            })
            .then(data => data.json)
            .then(data => {
                this.setState({
                    meetings: [{
                        id: 1,
                        name: 'John Smith',
                        date: new Date()
                    }]
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
        if (this.state.requestFailed) response = <p>Failed!</p>;
        const newElement = (
            <Link className='btn btn-default'
                to='/meeting/edit/0' title='New'>
                <div className='glyphicon glyphicon-plus'></div> New
            </Link>
        );
        if (this.state.meetings) {
            response = (
                <div className='row'>
                    <div className='col-md-8 col-md-offset-2'>
                        <table className='table table-striped table-manage'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <MeetingRow baseUrl='/meeting/edit' meetings={this.state.meetings} />
                        </table>
                    </div>
                    <div className='row'>
                        <div className='col-md-8 col-md-offset-2'>
                            {newElement}
                        </div>
                    </div>
                </div>
            );
        }

        return response;
    }
}