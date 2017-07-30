import { MenuItem } from '../view/menu-models';

export interface IMenuRepository {
    getLeftMenu(): MenuItem;
    getRightMenu(): MenuItem;
}