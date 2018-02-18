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
import { ProfileHelper } from '../../profiles/profile-helper';
import Util from '../../../../utils/util';
var MeetingDetail = (function (_super) {
    __extends(MeetingDetail, _super);
    function MeetingDetail(props) {
        var _this = _super.call(this, props) || this;
        _this.handleDateChange = function (event) {
            var meeting = _this.state.meeting;
            if (event.currentTarget.id === 'meeting-date') {
                meeting.date = new Date(event.currentTarget.value);
            }
            _this.setState({
                meeting: meeting
            });
        };
        _this.handleTextChange = function (event) {
            var meeting = _this.state.meeting;
            if (event.currentTarget.id === 'meeting-notes') {
                meeting.content = event.currentTarget.value;
            }
            _this.setState({
                meeting: meeting
            });
        };
        _this.handleSelect = function (event) {
            var meeting = _this.state.meeting;
            if (event.currentTarget.id === 'profile') {
                meeting.profileId = Number(event.currentTarget.value);
            }
            _this.setState({
                meeting: meeting
            });
        };
        _this.handleSave = function () {
            if (_this.state.isSaving) {
                return;
            }
            _this.setState({
                isSaving: true,
                saveResult: ''
            });
            var meeting = {
                id: _this.state.meeting.id,
                name: _this.state.meeting.name,
                content: _this.state.meeting.content,
                profileId: _this.state.meeting.profileId,
                date: Util.toUTC(_this.state.meeting.date)
            };
            fetch('/meeting/' + meeting.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(meeting)
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
                if (meeting.id === 0) {
                    var inserted = parseInt(response);
                    if (inserted > 0) {
                        _this.state.meeting.id = inserted;
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
            }, function (reason) {
                _this.setState({
                    saveResult: reason.message,
                    isSaving: false
                });
            });
        };
        _this.state = props;
        return _this;
    }
    MeetingDetail.prototype.componentDidMount = function () {
        var _this = this;
        fetch('/profiles')
            .then(function (response) {
            if (!response.ok) {
                throw Error('Network request failed');
            }
            return response;
        })
            .then(function (data) { return data.json(); })
            .then(function (data) {
            var profiles = data.profiles;
            var positions = data.positions;
            new ProfileHelper().toViewModels(profiles, positions);
            _this.setState({
                profiles: profiles
            });
        }, function () {
            _this.setState({
                requestFailed: true
            });
        });
    };
    MeetingDetail.prototype.render = function () {
        var response = React.createElement("p", null, "Loading...");
        if (this.state.requestFailed)
            response = React.createElement("p", null, "Failed!");
        if (this.state.profiles) {
            var meeting = this.state.meeting;
            var meetingDate = Util.toYYYYMMDDHHMMSS(meeting.date);
            var meetingDateElement = (React.createElement("div", { className: 'col-md-4' },
                React.createElement("div", { className: 'input-group' },
                    React.createElement("label", { htmlFor: 'meeting-date', className: 'sr-only' }, "Meeting Date"),
                    React.createElement("span", { className: 'input-group-addon', title: 'Meeting Date' },
                        React.createElement("i", { className: 'glyphicon glyphicon-calendar' })),
                    React.createElement("input", { type: 'datetime-local', id: 'meeting-date', value: meetingDate, onChange: this.handleDateChange, className: 'form-control', placeholder: 'Enter meeting date' }))));
            var meetingNotesElement = (React.createElement("div", { className: 'col-md-8' },
                React.createElement("div", { className: 'input-group' },
                    React.createElement("label", { htmlFor: 'meeting-notes', className: 'sr-only' }, "Meeting Notes"),
                    React.createElement("textarea", { id: 'meeting-notes', cols: 120, rows: 10, value: meeting.content, onChange: this.handleTextChange, className: 'form-control', placeholder: 'Enter meeting notes' }))));
            var profiles = this.state.profiles;
            var profileElement = (React.createElement("div", { className: 'col-md-3' },
                React.createElement("div", { className: 'input-group' },
                    React.createElement("label", { htmlFor: 'profile', className: 'sr-only' }, "Profile"),
                    React.createElement("span", { className: 'input-group-addon', title: 'Position' },
                        React.createElement("i", { className: 'glyphicon glyphicon-briefcase' })),
                    React.createElement("select", { id: 'profile', value: meeting.profileId, onChange: this.handleSelect, className: 'form-control' },
                        React.createElement("option", { value: '-1' }, "Select a profile"),
                        profiles.map(function (profile, key) {
                            return React.createElement("option", { key: key, value: profile.id },
                                profile.firstName,
                                " ",
                                profile.lastName);
                        })))));
            var topLine = (React.createElement("div", { className: 'row' },
                React.createElement("h2", null,
                    React.createElement("span", null, "Meeting notes")),
                profileElement));
            var inputForm = (React.createElement("div", { className: 'row' },
                meetingDateElement,
                meetingNotesElement));
            var saveElement = (React.createElement("button", { className: 'btn btn-default save-button', onClick: this.handleSave, title: 'Save' },
                React.createElement("span", { className: 'glyphicon glyphicon-save' }),
                " Save"));
            response = (React.createElement("div", { className: 'col-md-10 col-md-offset-1' },
                topLine,
                inputForm,
                React.createElement("div", { className: 'row' },
                    saveElement,
                    " ",
                    this.state.saveResult)));
        }
        return response;
    };
    return MeetingDetail;
}(React.Component));
export { MeetingDetail };
//# sourceMappingURL=meeting-detail.js.map