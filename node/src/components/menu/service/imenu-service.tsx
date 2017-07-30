import { MenuProps } from '../view/menu-models';

export interface IMenuService {
    createMenuProps(): MenuProps;
}