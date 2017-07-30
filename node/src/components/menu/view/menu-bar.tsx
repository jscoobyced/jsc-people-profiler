import * as React from 'react';

import { MenuBarProps } from './menu-models';
import { MenuBarState } from './menu-models';

export class MenuBar extends React.Component<MenuBarProps, MenuBarState> {
    constructor(props: MenuBarProps) {
        super(props);
        this.state = this.mapState(props);
    }

    private mapState(props: MenuBarProps): MenuBarState {
        let state = {
            leftMenuList: props.leftMenuList,
            rightMenuList: props.rightMenuList
        };

        return state;
    }

    render(): JSX.Element {
        return (
            <div id='navbar' className='navbar-collapse collapse'>
                {this.state.leftMenuList}
                {this.state.rightMenuList}
            </div>
        );
    }
}