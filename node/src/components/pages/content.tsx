import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import { MenuProps } from '../menu/view/menu-models';
import { MenuItem } from '../menu/view/menu-models';
import { PageController } from './page-controller';
import Key from './../../utils/key';

export class Content extends React.Component<MenuProps, MenuProps>  {
    private _key: Key = new Key();

    constructor(props: MenuProps) {
        super(props);
        this.state = {
            leftMenu: props.leftMenu,
            rightMenu: props.rightMenu
        };
    }

    private createRoutes(menuItem: MenuItem): Array<JSX.Element> {
        let routes = new Array<JSX.Element>();
        if (menuItem !== null
            && menuItem.menuItems !== null
            && menuItem.menuItems.length > 0) {
            let index = 1;
            menuItem.menuItems.forEach((innerMenuItem) => {
                let innerRoutes = this.createRoutes(innerMenuItem);
                innerRoutes.forEach(innerRoute => {
                    routes.push(innerRoute);
                });
            }
            );
        }

        routes.push(this.createRoute(menuItem.url, menuItem.title));
        return routes;
    }

    private createRoute(link: string, name: string): JSX.Element {
        if (link === '/') {
            return (
                <Route exact key={this._key.next()} path={link} render={props => <PageController name={name} url={link} />} />
            );
        }

        return (
            <Route key={this._key.next()} path={link} render={props => <PageController name={name} url={link} />} />
        );
    }

    render(): JSX.Element {
        let leftRoutes = this.createRoutes(this.state.leftMenu);
        let routes = leftRoutes.concat(this.createRoutes(this.state.rightMenu));
        return (
            <Router>
                <div>
                    {routes}
                </div>
            </Router>
        );
    }
}