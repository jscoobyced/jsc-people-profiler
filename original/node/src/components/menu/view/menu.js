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
import { HashRouter as Router, Link } from 'react-router-dom';
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Menu.prototype.render = function () {
        return (React.createElement(Router, null,
            React.createElement("div", { className: 'container' },
                React.createElement("ul", { className: 'nav navbar-nav' },
                    React.createElement("li", null,
                        React.createElement(Link, { to: '/', title: 'Home page of the profiler application' }, "Home")),
                    React.createElement("li", null,
                        React.createElement(Link, { to: '#', title: 'Profiles, meeting and action entries' },
                            "Profiles",
                            React.createElement("b", { className: 'caret' })),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement(Link, { to: '/profiles/manage', title: 'Manage profiles' }, "Manage")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: '/meeting/manage', title: 'Meeting notes' }, "Meetings")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: '/meeting/action', title: 'Action entries with deadlines' }, "Actions"))))),
                React.createElement("ul", { className: 'nav navbar-nav navbar-right' },
                    React.createElement("li", null,
                        React.createElement(Link, { to: '#', title: 'General configuration and info' },
                            "Other",
                            React.createElement("b", { className: 'caret' })),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement(Link, { to: '/settings', title: 'General configurations' }, "Settings")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: '/help', title: 'Help page of the profiler application' }, "Help")),
                            React.createElement("li", null,
                                React.createElement(Link, { to: '/about', title: 'About this application and its creator(s)' }, "About"),
                                " ")))))));
    };
    return Menu;
}(React.Component));
export { Menu };
//# sourceMappingURL=menu.js.map