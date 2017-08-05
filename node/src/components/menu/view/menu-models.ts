
export interface MenuProps {
    leftMenu: MenuItem;
    rightMenu: MenuItem;
}

export interface MenuState extends MenuProps {
}

export interface MenuBarProps {
    leftMenuList: JSX.Element;
    rightMenuList: JSX.Element;
}

export interface MenuBarState extends MenuBarProps {
}

export class MenuItem {
    public title: string;
    public description: string;
    public url: string;
    public menuItems: Array<MenuItem>;
}