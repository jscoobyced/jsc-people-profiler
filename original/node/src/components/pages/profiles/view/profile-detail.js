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
import Util from '../../../../utils/util';
var ProfileDetail = (function (_super) {
    __extends(ProfileDetail, _super);
    function ProfileDetail(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSelect = function (event) {
            var profile = _this.state.profile;
            if (event.currentTarget.id === 'position') {
                profile.position = Number(event.currentTarget.value);
            }
            _this.setState({
                profile: profile
            });
        };
        _this.handleChange = function (event) {
            var profile = _this.state.profile;
            if (event.currentTarget.id === 'firstname') {
                profile.firstName = event.currentTarget.value;
            }
            if (event.currentTarget.id === 'lastname') {
                profile.lastName = event.currentTarget.value;
            }
            if (event.currentTarget.id === 'start-date') {
                profile.startDate = new Date(event.currentTarget.value);
            }
            _this.setState({
                profile: profile
            });
        };
        _this.state = props;
        return _this;
    }
    ProfileDetail.prototype.render = function () {
        var response = React.createElement("p", null, "Loading...");
        if (this.state.profile) {
            var profile = this.state.profile;
            var positions = this.state.positions;
            var startDate = Util.toYYYYMMDD(profile.startDate);
            var firstName = (React.createElement("div", { className: 'col-md-3' },
                React.createElement("div", { className: 'input-group' },
                    React.createElement("label", { htmlFor: 'firstname', className: 'sr-only' }, "Firstname"),
                    React.createElement("span", { className: 'input-group-addon', title: 'Firstname' },
                        React.createElement("i", { className: 'glyphicon glyphicon-font' })),
                    React.createElement("input", { type: 'text', id: 'firstname', value: profile.firstName, onChange: this.handleChange, required: true, className: 'form-control', placeholder: 'Enter firstname' }))));
            var lastName = (React.createElement("div", { className: 'col-md-3' },
                React.createElement("div", { className: 'input-group' },
                    React.createElement("label", { htmlFor: 'lastname', className: 'sr-only' }, "Lastname"),
                    React.createElement("span", { className: 'input-group-addon', title: 'Lastname' },
                        React.createElement("i", { className: 'glyphicon glyphicon-font' })),
                    React.createElement("input", { type: 'text', id: 'lastname', value: profile.lastName, onChange: this.handleChange, required: true, className: 'form-control', placeholder: 'Enter lastname' }))));
            var startDateElement = (React.createElement("div", { className: 'col-md-3' },
                React.createElement("div", { className: 'input-group' },
                    React.createElement("label", { htmlFor: 'start-date', className: 'sr-only' }, "Start Date"),
                    React.createElement("span", { className: 'input-group-addon', title: 'Start Date' },
                        React.createElement("i", { className: 'glyphicon glyphicon-calendar' })),
                    React.createElement("input", { type: 'date', id: 'start-date', value: startDate, onChange: this.handleChange, className: 'form-control', placeholder: 'Enter start date' }))));
            var position = (React.createElement("div", { className: 'col-md-3' },
                React.createElement("div", { className: 'input-group' },
                    React.createElement("label", { htmlFor: 'position', className: 'sr-only' }, "Position"),
                    React.createElement("span", { className: 'input-group-addon', title: 'Position' },
                        React.createElement("i", { className: 'glyphicon glyphicon-briefcase' })),
                    React.createElement("select", { id: 'position', value: profile.position, onChange: this.handleSelect, className: 'form-control' }, positions.map(function (position, key) {
                        return React.createElement("option", { key: key, value: position.id }, position.name);
                    })))));
            response = (React.createElement("div", { className: 'row col-md-10 col-md-offset-1' },
                React.createElement("div", { className: 'row' },
                    React.createElement("h2", null,
                        (profile.firstName || profile.lastName) &&
                            React.createElement("span", null,
                                profile.firstName,
                                " ",
                                profile.lastName,
                                "'s Profile"),
                        !(profile.firstName || profile.lastName) &&
                            React.createElement("span", null, "Create Profile"))),
                React.createElement("div", { className: 'row tall' },
                    firstName,
                    lastName,
                    startDateElement,
                    position)));
        }
        return response;
    };
    return ProfileDetail;
}(React.Component));
export { ProfileDetail };
//# sourceMappingURL=profile-detail.js.map