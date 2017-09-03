import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Menu } from '../components/menu/view/menu';
import { MenuProps } from '../components/menu/view/menu-models';
import { IMenuService } from '../components/menu/service/imenu-service';
import { Content } from '../components/pages/content';

export class MainController {
    private _menuService: IMenuService;

    public constructor(menuService: IMenuService) {
        this._menuService = menuService;
    }

    public index(): void {
        const menuProps: MenuProps = this._menuService.createMenuProps();
        ReactDOM.render(
            React.createElement(Menu, menuProps, null),
            document.getElementById('menu')
        );
        ReactDOM.render(
            React.createElement(Content, menuProps, null),
            document.getElementById('body-content')
        );
    }
}