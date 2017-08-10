import * as React from 'react';

import { PageProps } from './page-models';
import { Page as P404 } from './errors/p404';

export class PageResolver {

    public resolve(url: string): string {
        let name = url.split('/');
        name.shift();
        if (name.length === 1) {
            name.push(name[0]);
        }

        if (name[0] === '') {
            name[0] = 'home';
            name[1] = 'home';
        }

        return './' + name[0] + '/view/' + name[1];
    }
}