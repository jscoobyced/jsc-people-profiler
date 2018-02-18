var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Page as Home } from './home/view/home';
import { Page as ManageProfile } from './profiles/view/manage';
import { Page as EditProfile } from './profiles/view/edit';
import { Page as Meeting } from './meeting/view/manage';
import { EditMeeting } from './meeting/view/edit';
import { Page as Action } from './meeting/view/actions';
import { Page as Help } from './help/view/help';
import { Page as About } from './about/view/about';
import { Page as Settings } from './settings/view/settings';
var Content = (function (_super) {
    __extends(Content, _super);
    function Content() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Content.prototype.render = function () {
        return (React.createElement(Router, null,
            React.createElement("div", null,
                React.createElement(Route, { exact: true, path: '/', component: Home }),
                React.createElement(Route, { path: '/profiles/manage', component: ManageProfile }),
                React.createElement(Route, { path: '/profiles/edit/:id', component: EditProfile }),
                React.createElement(Route, { path: '/meeting/manage', component: Meeting }),
                React.createElement(Route, { path: '/meeting/edit/:id', component: EditMeeting }),
                React.createElement(Route, { path: '/meeting/action', component: Action }),
                React.createElement(Route, { path: '/help', component: Help }),
                React.createElement(Route, { path: '/about', component: About }),
                React.createElement(Route, { path: '/settings', component: Settings }))));
    };
    return Content;
}(React.Component));
export { Content };
//# sourceMappingURL=content.js.map