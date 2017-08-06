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
        fetch('https://api.github.com/users/jscoobyced')
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed');
                }
                return response;
            })
            .then(d => d.json())
            .then(d => {
                this.setState({
                    githubData: d
                });
            }, () => {
                this.setState({
                    requestFailed: true
                });
            });
    }

    render(): JSX.Element {
        let response = 'Loading...';
        if (this.state.requestFailed) response = 'Failed!';
        if (this.state.githubData) response = this.state.githubData.login;
        return (
            <div className='row'>
                <div className='col-md-8 col-md-offset-2'>
                    <h2>{response}</h2>
                </div>
            </div>
        );
    }
}