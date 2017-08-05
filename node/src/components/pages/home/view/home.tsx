import * as React from 'react';
import { PageProps } from '../../page-models';

export class Page extends React.Component<PageProps, any> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            name: this.props.name
        };
    }

    render(): JSX.Element {
        return (
            <div>
                This is the home page.
            </div>
        );
    }
}