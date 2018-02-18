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
import Util from '../../../../utils/util';
import { MeetingDetail } from './meeting-detail';
import { MeetingHelper } from '../meeting-helper';
var EditMeeting = (function (_super) {
    __extends(EditMeeting, _super);
    function EditMeeting(props) {
        var _this = _super.call(this, props) || this;
        _this.state = props;
        return _this;
    }
    EditMeeting.prototype.componentDidMount = function () {
        var _this = this;
        var match = this.props.match;
        var id = match.params.id;
        fetch('/meeting/' + id)
            .then(function (response) {
            Util.handleNetworkResponse(response);
            if (!response.ok) {
                throw Error('Network request failed');
            }
            return response;
        })
            .then(function (d) { return d.json(); })
            .then(function (d) {
            _this.setState({
                meeting: new MeetingHelper().toViewModel(d),
            });
        }, function () {
            _this.setState({
                requestFailed: true
            });
        });
    };
    EditMeeting.prototype.render = function () {
        var match = this.props.match;
        var url = '/meeting/manage';
        var back = 'Back';
        var id = match.params.id;
        var element = (React.createElement("span", null, "Loading..."));
        if (this.state.requestFailed)
            element = React.createElement("p", null, "Failed!");
        if (this.state.meeting) {
            if (match) {
                element = (React.createElement(MeetingDetail, { meeting: this.state.meeting }));
            }
        }
        var content = (React.createElement("div", { className: 'container row' },
            React.createElement("div", { className: 'row' },
                React.createElement(Link, { to: url, title: back },
                    React.createElement("div", { className: 'glyphicon glyphicon-hand-left' }),
                    " ",
                    back)),
            element));
        return content;
    };
    return EditMeeting;
}(React.Component));
export { EditMeeting };
//# sourceMappingURL=edit.js.map