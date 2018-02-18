import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Menu } from '../components/menu/view/menu';
import { Content } from '../components/pages/content';

export class MainController {
    public index(): void {
        ReactDOM.render(
            React.createElement(Menu, null, null),
            document.getElementById('menu')
        );
        ReactDOM.render(
            React.createElement(Content, null, null),
            document.getElementById('body-content')
        );
    }
}