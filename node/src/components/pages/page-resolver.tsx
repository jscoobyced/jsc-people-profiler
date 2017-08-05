import * as React from 'react';

import { PageProps } from './page-models';
import { Page as P404 } from './errors/p404';

export class PageResolver {

    public resolve(props: PageProps): JSX.Element {
        let name = props.url.split('/');
        name.shift();
        if (name.length === 1) {
            name.push(name[0]);
        }

        if (name[0] === '') {
            name[0] = 'home';
            name[1] = 'home';
        }

        let page = null;
        let element: JSX.Element = null;
        try {
            page = require('./' + name[0] + '/view/' + name[1]);
            let Component = page.Page;
            element = (<Component {...props} />);
        } catch (error) {
            element = (<P404 />);
        }
        return element;
    }
}