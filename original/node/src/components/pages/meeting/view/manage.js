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
import { MeetingRow } from './manage-row';
import { MeetingHelper } from '../meeting-helper';
var Page = (function (_super) {
    __extends(Page, _super);
    function Page(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            baseUrl: _this.props.url
        };
        return _this;
    }
    Page.prototype.componentDidMount = function () {
        var _this = this;
        fetch('/meetings')
            .then(function (response) {
            if (!response.ok) {
                throw Error('Network request failed');
            }
            return response;
        })
            .then(function (data) { return data.json(); })
            .then(function (data) {
            _this.setState({
                meetings: new MeetingHelper().toViewModels(data)
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
        if (this.state.requestFailed)
            response = React.createElement("p", null, "Failed!");
        var newElement = (React.createElement(Link, { className: 'btn btn-default', to: '/meeting/edit/0', title: 'New' },
            React.createElement("div", { className: 'glyphicon glyphicon-plus' }),
            " New"));
        if (this.state.meetings) {
            response = (React.createElement("div", { className: 'row' },
                React.createElement("div", { className: 'col-md-8 col-md-offset-2' },
                    React.createElement("table", { className: 'table table-striped table-manage' },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "#"),
                                React.createElement("th", null, "Name"),
                                React.createElement("th", null, "Date"),
                                React.createElement("th", null, "Edit"))),
                        React.createElement(MeetingRow, { baseUrl: '/meeting/edit', meetings: this.state.meetings }))),
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: 'col-md-8 col-md-offset-2' }, newElement))));
        }
        return response;
    };
    return Page;
}(React.Component));
export { Page };
//# sourceMappingURL=manage.js.map