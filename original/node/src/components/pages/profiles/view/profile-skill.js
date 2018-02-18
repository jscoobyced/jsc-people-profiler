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
var ProfileSkill = (function (_super) {
    __extends(ProfileSkill, _super);
    function ProfileSkill(props) {
        var _this = _super.call(this, props) || this;
        _this.handleAddSkill = function (event) {
            var skillToAdd = {
                id: -1,
                name: '',
                score: -1
            };
            if (_this.state.selectedSkill) {
                skillToAdd = _this.state.selectedSkill;
            }
            if (event.currentTarget.id && parseInt(event.currentTarget.id) !== 0) {
                skillToAdd.id = parseInt(event.currentTarget.options[event.currentTarget.selectedIndex].value);
                skillToAdd.name = event.currentTarget.options[event.currentTarget.selectedIndex].text;
                _this.setState({
                    selectedSkill: skillToAdd
                });
            }
        };
        _this.handleAddScore = function (event) {
            var skillToAdd = {
                id: -1,
                name: '',
                score: 0
            };
            if (_this.state.selectedSkill) {
                skillToAdd = _this.state.selectedSkill;
            }
            if (event.currentTarget.id) {
                skillToAdd.score = parseInt(event.currentTarget.value);
                _this.setState({
                    selectedSkill: skillToAdd
                });
            }
        };
        _this.openAction = function () {
            _this.setState({
                showModal: true,
                selectedSkill: {
                    id: -1,
                    name: '',
                    score: 0
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
        _this.removeSkill = function (event) {
            var id = parseInt(event.target.getAttribute('data-id'));
            var profile = _this.state.profile;
            var newSkills = [];
            profile.skills.forEach(function (skill) {
                if (skill.id !== id) {
                    newSkills.push(skill);
                }
            });
            profile.skills = newSkills;
            _this.setState({
                profile: profile
            });
        };
        _this.doAction = function () {
            if (_this.state.selectedSkill && _this.state.selectedSkill.score > 0) {
                var profile = _this.state.profile;
                var found_1 = false;
                profile.skills.forEach(function (skill) {
                    if (skill.id === _this.state.selectedSkill.id) {
                        found_1 = true;
                        return;
                    }
                });
                var selectedSkill = void 0;
                if (!found_1) {
                    selectedSkill = _this.state.selectedSkill;
                    profile.skills.push(selectedSkill);
                }
                _this.setState({
                    profile: profile,
                    selectedSkill: {
                        id: -1,
                        name: '',
                        score: selectedSkill.score
                    }
                });
            }
            return null;
        };
        _this.state = props;
        return _this;
    }
    ProfileSkill.prototype.createModalContent = function () {
        if (!this.props.allSkills) {
            return (React.createElement("div", null));
        }
        var selectedSkill = this.state.selectedSkill ?
            this.state.selectedSkill
            : {
                id: -1,
                name: '',
                score: -1
            };
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("select", { id: 'skills', value: selectedSkill.id, onChange: this.handleAddSkill, className: 'form-control' },
                    React.createElement("option", { value: '-1' }, "Choose a skill"),
                    this.props.allSkills.map(function (skill, key) {
                        return React.createElement("option", { key: key, value: skill.id }, skill.name);
                    }))),
            React.createElement("div", null,
                React.createElement("div", { className: 'btn-group', id: 'score' },
                    React.createElement("label", { className: 'btn btn-success' },
                        React.createElement("input", { type: 'radio', name: 'options', id: 'skillScore', onChange: this.handleAddScore, value: '5', autoComplete: 'off' }),
                        "Excellent"),
                    React.createElement("label", { className: 'btn btn-success' },
                        React.createElement("input", { type: 'radio', name: 'options', id: 'skillScore', onChange: this.handleAddScore, value: '4', autoComplete: 'off' }),
                        "High"),
                    React.createElement("label", { className: 'btn btn-info' },
                        React.createElement("input", { type: 'radio', name: 'options', id: 'skillScore', onChange: this.handleAddScore, value: '3', autoComplete: 'off' }),
                        "Normal"),
                    React.createElement("label", { className: 'btn btn-warning' },
                        React.createElement("input", { type: 'radio', name: 'options', id: 'skillScore', onChange: this.handleAddScore, value: '2', autoComplete: 'off' }),
                        "Medium"),
                    React.createElement("label", { className: 'btn btn-danger' },
                        React.createElement("input", { type: 'radio', name: 'options', id: 'skillScore', onChange: this.handleAddScore, value: '1', autoComplete: 'off' }),
                        "Low")))));
    };
    ProfileSkill.prototype.render = function () {
        var _this = this;
        var addSkillElement = this.createModalContent();
        var addButton = (React.createElement("button", { className: 'btn btn-default', onClick: this.openAction, title: 'Add' },
            React.createElement("span", { className: 'glyphicon glyphicon-plus' }),
            "Add"));
        var modal = (React.createElement(Modal, { close: 'Close', do: 'Add', closeAction: this.closeAction, doAction: this.doAction, title: 'Add Skill', name: 'skillModal', done: 'Done', doneAction: this.closeAction, content: addSkillElement }));
        return (React.createElement("div", { className: 'row' },
            this.state.showModal ?
                React.createElement("div", { className: 'row' }, modal) : null,
            React.createElement("div", { className: 'row' },
                React.createElement("div", { className: 'col-md-7' },
                    React.createElement("span", { className: 'big' }, "Skills")),
                React.createElement("div", { className: 'col-md-3' }, addButton)),
            React.createElement("div", { className: 'row' }, this.state.profile
                && this.state.profile.skills ?
                this.state.profile.skills.map(function (skill, key) {
                    var maxScore = 5;
                    var percent = (100 * skill.score / 5);
                    var style = {
                        width: percent + '%'
                    };
                    var status = ['success', 'danger', 'warning', 'info', 'success'];
                    var progressCurrentClass = status[skill.score % maxScore];
                    var progressClass = 'progress-bar progress-bar-' + progressCurrentClass;
                    return (React.createElement("div", { className: 'row', key: key },
                        React.createElement("div", { className: 'col-md-10' },
                            React.createElement("div", { className: 'progress' },
                                React.createElement("div", { className: progressClass, role: 'progressbar', "aria-valuenow": skill.score, style: style, "aria-valuemin": '0', "aria-valuemax": maxScore },
                                    skill.name,
                                    ": ",
                                    skill.score))),
                        React.createElement("div", { className: 'col-md-2 pull-right' },
                            React.createElement("span", { onClick: _this.removeSkill, "data-id": skill.id, className: 'glyphicon glyphicon-remove text-danger' }))));
                }) : null)));
    };
    return ProfileSkill;
}(React.Component));
export { ProfileSkill };
//# sourceMappingURL=profile-skill.js.map