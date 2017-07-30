import $ = require('jquery');
import { IMenuRepository } from './imenu-repository';
import { MenuItem } from '../view/menu-models';

export class MenuRepository implements IMenuRepository {
    private _menuData: any;

    private get MenuData(): any {
        if (this._menuData === undefined) {
            let data = $('#menu').attr('data-menu');
            this._menuData = JSON.parse(data);
        }
        return this._menuData;
    }

    public getLeftMenu(): MenuItem {
        return this.MenuData.leftMenu;
    }

    public getRightMenu(): MenuItem {
        return this.MenuData.rightMenu;
    }
}