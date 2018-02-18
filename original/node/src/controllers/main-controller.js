import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Menu } from '../components/menu/view/menu';
import { Content } from '../components/pages/content';
var MainController = (function () {
    function MainController() {
    }
    MainController.prototype.index = function () {
        ReactDOM.render(React.createElement(Menu, null, null), document.getElementById('menu'));
        ReactDOM.render(React.createElement(Content, null, null), document.getElementById('body-content'));
    };
    return MainController;
}());
export { MainController };
//# sourceMappingURL=main-controller.js.map