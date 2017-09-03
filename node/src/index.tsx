import { MainController } from './controllers/main-controller';
import { MenuResolver } from './resolvers/menu-resolver';

import Util from './utils/util';

Util.ready(() => {
    const menuResolver: MenuResolver = new MenuResolver();
    const mainController: MainController = new MainController(menuResolver.MenuService);
    mainController.index();
});