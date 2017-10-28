import { MainController } from './controllers/main-controller';

import Util from './utils/util';

Util.ready(() => {
    const mainController: MainController = new MainController();
    mainController.index();
});