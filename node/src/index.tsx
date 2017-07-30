import $ = require('jquery');
import { MainController } from './controllers/main-controller';
import { MenuResolver } from './resolvers/menu-resolver';

$((): void => {
    let menuResolver: MenuResolver = new MenuResolver();
    let mainController: MainController = new MainController(menuResolver.MenuService);
    mainController.index();
});