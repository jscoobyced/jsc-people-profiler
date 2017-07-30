import { IMenuService } from './imenu-service';
import { MenuProps } from '../view/menu-models';
import { IMenuRepository } from '../repository/imenu-repository';

export class MenuService implements IMenuService {
    private menuRepository: IMenuRepository;

    public constructor(menuRepository: IMenuRepository) {
        this.menuRepository = menuRepository;
    }

    public createMenuProps(): MenuProps {
        let menuProps: MenuProps = {
            leftMenu: this.menuRepository.getLeftMenu(),
            rightMenu: this.menuRepository.getRightMenu()
        };
        return menuProps;
    }
}