import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import { MenuProps } from '../menu/view/menu-models';
import { MenuItem } from '../menu/view/menu-models';
import { PageResolver } from './page-resolver';
import Key from './../../utils/key';

export class Content extends React.Component<MenuProps, MenuProps>  {
    private _key: Key = new Key();
    private _routes: Array<JSX.Element> = new Array<JSX.Element>();
    private _resolver = new PageResolver();

    constructor(props: MenuProps) {
        super(props);
        this.state = {
            leftMenu: props.leftMenu,
            rightMenu: props.rightMenu
        };
    }

    private addRoutes(menuItem: MenuItem): void {
        if (menuItem !== null
            && menuItem.menuItems !== null
            && menuItem.menuItems.length > 0) {
            menuItem.menuItems.forEach((innerMenuItem) => {
                this.addRoutes(innerMenuItem);
            });
        }

        this.addRoute(menuItem.url, menuItem.title);
    }

    private addRoute(link: string, name: string): void {
        if (link === '#') {
            return;
        }
        let page = this._resolver.resolve(link);
        let extension = '';
        if (page.endsWith('edit')) {
            extension += '/:id';
        }

        let path = link + extension;
        let self = this;

        const Page = require(page + '.tsx');

        let Edit = Page.Page;
        if (link === '/') {
            self._routes.push(
                <Route exact key={this._key.next()} path={path} component={Edit} />
            );
        } else {
            self._routes.push(
                <Route key={this._key.next()} path={path} component={Edit} />
            );
        }
    }

    render(): JSX.Element {
        this.addRoutes(this.state.leftMenu);
        this.addRoutes(this.state.rightMenu);
        return (
            <Router>
                <div>
                    {this._routes}
                </div>
            </Router>
        );
    }
}