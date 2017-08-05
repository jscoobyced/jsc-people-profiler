import { MainController } from './controllers/main-controller';
import { MenuResolver } from './resolvers/menu-resolver';

import Util from './utils/util';

Util.ready(() => {
    let menuResolver: MenuResolver = new MenuResolver();
    let mainController: MainController = new MainController(menuResolver.MenuService);
    mainController.index();
});