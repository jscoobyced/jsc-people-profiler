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
import { Modal } from '../../../../utils/modal';
var ProfileCharacteristic = (function (_super) {
    __extends(ProfileCharacteristic, _super);
    function ProfileCharacteristic(props) {
        var _this = _super.call(this, props) || this;
        _this.handleAdd = function (event) {
            if (event.currentTarget.id && parseInt(event.currentTarget.id) !== 0) {
                var characteristicToAdd = {
                    id: parseInt(event.currentTarget.options[event.currentTarget.selectedIndex].value),
                    name: event.currentTarget.options[event.currentTarget.selectedIndex].text
                };
                _this.setState({
                    selectedCharacteristic: characteristicToAdd
                });
            }
        };
        _this.openAction = function () {
            _this.setState({
                showModal: true,
                selectedCharacteristic: {
                    id: -1,
                    name: ''
                }
            });
            return null;
        };
        _this.closeAction = function () {
            _this.setState({
                showModal: false
            });
            return null;
        };
        _this.removeCharacteristic = function (event) {
            var id = parseInt(event.target.getAttribute('data-id'));
            var profile = _this.state.profile;
            var newCharacteristics = [];
            profile.characteristics.forEach(function (characteristic) {
                if (characteristic.id !== id) {
                    newCharacteristics.push(characteristic);
                }
            });
            profile.characteristics = newCharacteristics;
            _this.setState({
                profile: profile
            });
        };
        _this.doAction = function () {
            if (_this.state.selectedCharacteristic) {
                var profile = _this.state.profile;
                var found_1 = false;
                profile.characteristics.forEach(function (characteristic) {
                    if (characteristic.id === _this.state.selectedCharacteristic.id) {
                        found_1 = true;
                        return;
                    }
                });
                if (!found_1) {
                    profile.characteristics.push(_this.state.selectedCharacteristic);
                }
                _this.setState({
                    profile: profile
                });
            }
            return null;
        };
        _this.state = props;
        return _this;
    }
    ProfileCharacteristic.prototype.createModalContent = function () {
        if (!this.props.allCharacteristics) {
            return (React.createElement("div", null));
        }
        var selectedCharacteristic = this.state.selectedCharacteristic ?
            this.state.selectedCharacteristic
            : {
                id: -1,
                name: ''
            };
        return (React.createElement("div", null,
            React.createElement("select", { id: 'characteristics', value: selectedCharacteristic.id, onChange: this.handleAdd, className: 'form-control' },
                React.createElement("option", { value: '-1' }, "Choose an option"),
                this.props.allCharacteristics.map(function (characteristic, key) {
                    return React.createElement("option", { key: key, value: characteristic.id }, characteristic.name);
                }))));
    };
    ProfileCharacteristic.prototype.render = function () {
        var _this = this;
        var addCharacteristicElement = this.createModalContent();
        var addButton = (React.createElement("button", { className: 'btn btn-default', onClick: this.openAction, title: 'Add' },
            React.createElement("span", { className: 'glyphicon glyphicon-plus' }),
            "Add"));
        var modal = (React.createElement(Modal, { close: 'Close', do: 'Add', closeAction: this.closeAction, doAction: this.doAction, doneAction: this.closeAction, done: 'Done', title: 'Add characteristic', name: 'characteristicModal', content: addCharacteristicElement }));
        return (React.createElement("div", null,
            this.state.showModal ?
                React.createElement("div", { className: 'row' }, modal) : null,
            React.createElement("div", { className: 'row' },
                React.createElement("div", { className: 'col-md-7' },
                    React.createElement("span", { className: 'big' }, "Characteristics")),
                React.createElement("div", { className: 'col-md-3' }, addButton)),
            React.createElement("div", { className: 'row' }, this.state.profile
                && this.state.profile.characteristics ?
                React.createElement("ul", null, this.state.profile.characteristics.map(function (characteristic, key) {
                    return (React.createElement("li", { key: key, className: 'li-200' },
                        React.createElement("span", { className: 'col-md-10' }, characteristic.name),
                        React.createElement("span", { onClick: _this.removeCharacteristic, "data-id": characteristic.id, className: 'col-md-2 pull-right glyphicon glyphicon-remove text-danger' })));
                })) : null)));
    };
    return ProfileCharacteristic;
}(React.Component));
export { ProfileCharacteristic };
//# sourceMappingURL=profile-characteristic.js.map