import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import { MenuProps } from '../menu/view/menu-models';
import { MenuItem } from '../menu/view/menu-models';
import { PageController } from './page-controller';
import Key from './../../utils/key';

export class Content extends React.Component<MenuProps, MenuProps>  {
    private _key: Key = new Key();
    private _routes: Array<JSX.Element> = new Array<JSX.Element>();
    private _counter: number = 0;

    constructor(props: MenuProps) {
        super(props);
        this.state = {
            leftMenu: props.leftMenu,
            rightMenu: props.rightMenu
        };
    }

    private addRoutes(menuItem: MenuItem): void {
        this._counter++;
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
        if (link === '/') {
            this._routes.push(
                <Route exact key={this._key.next()} path={link} render={props => <PageController name={name} url={link} />} />
            );
            this._counter--;
            return;
        }

        if (link.indexOf('edit') > 0) {
            let path = link + '/:id';
            let self = this;
            System.import('./profiles/view/edit').then(
                Page => {
                    let Edit = Page.Page;
                    self._routes.push(
                        <Route key={this._key.next()} path={path} component={Edit} />
                    );
                    self._counter--;
                }
            );
            return;
        }

        this._routes.push(
            <Route key={this._key.next()} path={link} render={props => <PageController name={name} url={link} />} />
        );
        this._counter--;
    }

    componentDidMount() {
        this.addRoutes(this.state.leftMenu);
        this.addRoutes(this.state.rightMenu);
    }

    render(): JSX.Element {
        console.log(this._counter);
        if (this._counter === 0) {
            return (
                <Router>
                    <div>
                        {this._routes}
                    </div>
                </Router>
            );
        } else {
            return (<div></div>);
        }
    }
}