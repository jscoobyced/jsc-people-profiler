import * as React from 'react';
import { PageProps } from '../page-models';

export class Page extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                404 Page not found.
            </div>
        );
    }
}