import * as React from 'react';
import { PageProps } from '../../page-models';

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
                            <tbody>
                                <tr>
                                    <th scope='row'>1</th>
                                    <td>{this.state.data[0].firstName}</td>
                                    <td>{this.state.data[0].lastName}</td>
                                    <td>{this.state.data[0].startDate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        return response;
    }
}