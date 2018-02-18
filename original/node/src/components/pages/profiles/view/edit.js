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
import { ProfileDetail } from './profile-detail';
import { ProfileCharacteristic } from './profile-characteristic';
import { ProfileSkill } from './profile-skill';
import { ProfileHelper } from '../profile-helper';
import Util from '../../../../utils/util';
var Page = (function (_super) {
    __extends(Page, _super);
    function Page(props) {
        var _this = _super.call(this, props) || this;
        _this.profileHelper = new ProfileHelper();
        _this.handleSave = function () {
            if (_this.state.isSaving) {
                return;
            }
            _this.setState({
                isSaving: true,
                saveResult: ''
            });
            var profile = {
                id: _this.state.profile.id,
                firstName: _this.state.profile.firstName,
                lastName: _this.state.profile.lastName,
                position: _this.state.profile.position,
                startDate: Util.toUTC(_this.state.profile.startDate),
                status: _this.state.profile.status,
                characteristics: _this.state.profile.characteristics,
                skills: _this.state.profile.skills
            };
            fetch('/profile/' + profile.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile)
            })
                .then(function (response) {
                Util.handleNetworkResponse(response);
                if (!response.ok) {
                    _this.setState({
                        saveResult: 'Failed',
                        isSaving: false
                    });
                }
                return response;
            })
                .then(function (response) { return response.text(); })
                .then(function (response) {
                if (profile.id === 0) {
                    var inserted = parseInt(response);
                    if (inserted > 0) {
                        _this.state.profile.id = inserted;
                        _this.setState({
                            saveResult: 'Success',
                            isSaving: false
                        });
                    }
                }
                else {
                    _this.setState({
                        saveResult: 'Success',
                        isSaving: false
                    });
                }
            }, function () {
                _this.setState({
                    saveResult: 'Failed',
                    isSaving: false
                });
            });
        };
        _this.state = props;
        return _this;
    }
    Page.prototype.componentDidMount = function () {
        var _this = this;
        var match = this.props.match;
        var id = match.params.id;
        fetch('/profile/' + id)
            .then(function (response) {
            if (!response.ok) {
                throw Error('Network request failed');
            }
            return response;
        })
            .then(function (d) { return d.json(); })
            .then(function (d) {
            var positions = d.positions;
            var allCharacteristics = d.allCharacteristics;
            var allSkills = d.allSkills;
            var profile = _this.profileHelper.toViewModel(d.profile, positions);
            _this.setState({
                profile: profile,
                positions: positions,
                allCharacteristics: allCharacteristics,
                allSkills: allSkills
            });
        }, function () {
            _this.setState({
                requestFailed: true
            });
        });
    };
    Page.prototype.render = function () {
        var match = this.props.match;
        var url = '/profiles/manage';
        var back = 'Back';
        var id = match.params.id;
        var element = (React.createElement("div", null, "Loading..."));
        var characteristicElement = (React.createElement("div", null));
        var skillElement = (React.createElement("div", null));
        var saveElement = (React.createElement("button", { className: 'btn btn-default save-button', onClick: this.handleSave, title: 'Save' },
            React.createElement("span", { className: 'glyphicon glyphicon-save' }),
            " Save"));
        if (this.state.requestFailed)
            element = React.createElement("p", null, "Failed!");
        if (this.state.profile) {
            if (match) {
                element = (React.createElement(ProfileDetail, { id: id, profile: this.state.profile, positions: this.state.positions }));
                characteristicElement = (React.createElement(ProfileCharacteristic, { id: id, profile: this.state.profile, showModal: false, allCharacteristics: this.state.allCharacteristics }));
                skillElement = (React.createElement(ProfileSkill, { id: id, allSkills: this.state.allSkills, showModal: false, profile: this.state.profile }));
            }
        }
        var content = (React.createElement("div", null,
            React.createElement("div", { className: 'row' },
                React.createElement(Link, { to: url, title: back },
                    React.createElement("span", { className: 'glyphicon glyphicon-hand-left' }),
                    " ",
                    back),
                saveElement,
                " ",
                this.state.saveResult),
            element,
            React.createElement("div", { className: 'col-md-4 col-md-offset-1' }, characteristicElement),
            React.createElement("div", { className: 'col-md-4 col-md-offset-1' }, skillElement)));
        return content;
    };
    return Page;
}(React.Component));
export { Page };
//# sourceMappingURL=edit.js.map