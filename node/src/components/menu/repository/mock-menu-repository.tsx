import { IMenuRepository } from './imenu-repository';
import { MenuItem } from '../view/menu-models';

export class MockMenuRepository implements IMenuRepository {
    public getLeftMenu(): MenuItem {
        var leftMenu1 = new MenuItem();
        leftMenu1.title = 'Home';
        var leftSubMenu1 = new MenuItem();
        leftSubMenu1.title = 'Something Cool';
        var leftSubMenu2 = new MenuItem();
        leftSubMenu2.title = 'Something Cooler';
        var leftSubSubMenu1 = new MenuItem();
        leftSubSubMenu1.title = 'Cooler thing';
        var leftSubSubMenu2 = new MenuItem();
        leftSubSubMenu2.title = 'Cooler stuff';
        leftSubMenu2.menuItems = new Array<MenuItem>();
        leftSubMenu2.menuItems.push(leftSubSubMenu1);
        leftSubMenu2.menuItems.push(leftSubSubMenu2);
        leftMenu1.menuItems = new Array<MenuItem>();
        leftMenu1.menuItems.push(leftSubMenu1);
        leftMenu1.menuItems.push(leftSubMenu2);
        var leftMenu2 = new MenuItem();
        leftMenu2.title = 'Info';
        var leftSubMenu21 = new MenuItem();
        leftSubMenu21.title = 'Information';
        var leftSubMenu22 = new MenuItem();
        leftSubMenu22.title = 'Useful Stuff';
        leftMenu2.menuItems = new Array<MenuItem>();
        leftMenu2.menuItems.push(leftSubMenu21);
        leftMenu2.menuItems.push(leftSubMenu22);
        var leftMenu = new MenuItem();
        leftMenu.menuItems = new Array<MenuItem>();
        leftMenu.menuItems.push(leftMenu1);
        leftMenu.menuItems.push(leftMenu2);
        return leftMenu;
    }

    public getRightMenu(): MenuItem {
        var rightMenu = new MenuItem();
        rightMenu.title = 'Help';
        return rightMenu;
    }
}