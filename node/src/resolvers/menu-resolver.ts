import { MenuRepository } from '../components/menu/repository/menu-repository';
import { IMenuService } from '../components/menu/service/imenu-service';
import { MenuService } from '../components/menu/service/menu-service';

export class MenuResolver {

    get MenuService(): IMenuService {
        let menuRepository = new MenuRepository();
        let menuService: IMenuService = new MenuService(menuRepository);
        return menuService;
    }
}