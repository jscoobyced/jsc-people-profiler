import * as React from 'react';

import { PageProps } from './page-models';
import { PageResolver } from './page-resolver';

export class PageController extends React.Component<PageProps, PageProps>  {
    private _resolver: PageResolver;

    constructor(props: PageProps) {
        super(props);
        this.state = props;
        this._resolver = new PageResolver();
    }

    render(): JSX.Element {
        return this._resolver.resolve(this.state);
    }
}