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
import { Link } from 'react-router-dom';
import { ProfileRow } from './profile-row';
import { ProfileHelper } from '../profile-helper';
var Page = (function (_super) {
    __extends(Page, _super);
    function Page(props) {
        var _this = _super.call(this, props) || this;
        _this.profileHelper = new ProfileHelper();
        _this.state = {
            name: _this.props.name
        };
        return _this;
    }
    Page.prototype.componentDidMount = function () {
        var _this = this;
        fetch('/profiles')
            .then(function (response) {
            if (!response.ok) {
                throw Error('Network request failed');
            }
            return response;
        })
            .then(function (d) { return d.json(); })
            .then(function (d) {
            var profiles = d.profiles;
            var positions = d.positions;
            _this.profileHelper.toViewModels(profiles, positions);
            _this.setState({
                data: profiles
            });
        }, function () {
            _this.setState({
                requestFailed: true
            });
        });
    };
    Page.prototype.render = function () {
        var response = React.createElement("p", null, "Loading...");
        if (this.state.requestFailed)
            response = React.createElement("p", null, "Failed!");
        var newElement = (React.createElement(Link, { className: 'btn btn-default', to: '/profiles/edit/0', title: 'New' },
            React.createElement("span", { className: 'glyphicon glyphicon-plus' }),
            " New"));
        if (this.state.data) {
            response = (React.createElement("div", { className: 'row' },
                React.createElement("div", { className: 'col-md-8 col-md-offset-2' },
                    React.createElement("table", { className: 'table table-striped table-manage' },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "#"),
                                React.createElement("th", null, "First Name"),
                                React.createElement("th", null, "Last Name"),
                                React.createElement("th", null, "Position"),
                                React.createElement("th", null, "Start Date"),
                                React.createElement("th", null, "Edit"))),
                        React.createElement(ProfileRow, { baseUrl: '/profiles/edit', profiles: this.state.data }))),
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: 'col-md-8 col-md-offset-2' }, newElement))));
        }
        return response;
    };
    return Page;
}(React.Component));
export { Page };
//# sourceMappingURL=manage.js.map