import * as React from 'react';

import { MenuHeader } from './menu-headers';
import { MenuBar } from './menu-bar';
import { MenuProps } from './menu-models';
import { MenuBarProps } from './menu-models';
import { MenuItem } from './menu-models';

export class Menu extends React.Component<MenuProps, any> {
    private menuMultiLevelClassName: string = 'dropdown-menu multi-level';
    private menuUlLeftClassName: string = 'nav navbar-nav';
    private menuUlRightClassName: string = 'nav navbar-nav navbar-right';
    private menuUlSubMenuClassName: string = 'dropdown-submenu';
    private menuUlToggleClassName: string = 'dropdown-toggle';

    constructor(props: MenuProps) {
        super(props);
    }

    private createMenuItem(menuItem: MenuItem, index: number, isRight: boolean, level: number): JSX.Element {
        let menuUlClassName = isRight ? this.menuUlRightClassName : this.menuUlLeftClassName;
        let liItem = this.createLiItem(menuItem, index);
        let result: JSX.Element;

        if (menuItem.title === null || menuItem.title === '') {
            // Root level of the menu
            let childrenNodes: JSX.Element[] = this.createChildrenNodes(menuItem, index, isRight, level);
            result = (
                <ul className={menuUlClassName}>
                    {childrenNodes}
                </ul>
            );
        } else {
            let subLevel: boolean = false;
            let subResult: JSX.Element;
            if (menuItem.menuItems == null || menuItem.menuItems.length === 0) {
                // Single menu item, just add it
                if (level === 0) {
                    result = (
                        <ul className={menuUlClassName}>
                            {liItem}
                        </ul>
                    );
                } else {
                    result = liItem;
                }
            } else {
                // Menu item with children
                subLevel = true;
                let childrenNodes: JSX.Element[] = this.createChildrenNodes(menuItem, index, isRight, level);
                subResult = (
                    <ul className={this.menuMultiLevelClassName}>
                        {childrenNodes}
                    </ul>
                );
            }
            if (subLevel) {
                // First level menu
                if (level === 1) {
                    result = (
                        <li key={index}>
                            <a href={menuItem.url} className={this.menuUlToggleClassName}
                                alt={menuItem.description}
                                title={menuItem.description}
                                data-toggle='dropdown'>
                                {menuItem.title}<b className='caret'></b>
                            </a>
                            {subResult}
                        </li>
                    );
                } else {
                    // Deeper level menus
                    result = (
                        <li key={index} className={this.menuUlSubMenuClassName}>
                            <a href={menuItem.url} className={this.menuUlToggleClassName}
                                alt={menuItem.description}
                                title={menuItem.description}
                                data-toggle='dropdown'>{menuItem.title}</a>
                            {subResult}
                        </li>
                    );
                }
            }
        }
        return result;
    }

    private createLiItem(menuItem: MenuItem, index: number): JSX.Element {
        return (
            <li key={index}>
                <a href={menuItem.url}
                    alt={menuItem.description}
                    title={menuItem.description}
                >{menuItem.title}</a>
            </li>
        );
    }
    private createChildrenNodes(menuItem: MenuItem, index: number, isRight: boolean, level: number): JSX.Element[] {
        let counter = 1;
        let childrenNodes: JSX.Element[] = [];
        menuItem.menuItems.forEach(innerMenuItem => {
            childrenNodes.push(this.createMenuItem(innerMenuItem, (index + counter++), isRight, level + 1));
        });

        return childrenNodes;
    }

    render(): JSX.Element {
        let leftMenuList = this.createMenuItem(this.props.leftMenu, 0, false, 0);
        let rightMenuList = this.createMenuItem(this.props.rightMenu, 1, true, 0);

        return (
            <nav className='navbar navbar-fixed-top'>
                <div className='container'>
                    <MenuHeader />
                    <MenuBar leftMenuList={leftMenuList}
                        rightMenuList={rightMenuList} />
                </div>
            </nav>
        );
    }
}