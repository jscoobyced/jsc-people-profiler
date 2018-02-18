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
var MeetingRow = (function (_super) {
    __extends(MeetingRow, _super);
    function MeetingRow(props) {
        var _this = _super.call(this, props) || this;
        _this.state = props;
        return _this;
    }
    MeetingRow.prototype.render = function () {
        var _this = this;
        var rows = this.state.meetings.map(function (meeting, key) {
            var url = _this.state.baseUrl + '/' + meeting.id;
            var id = meeting.id;
            var name = meeting.name;
            var edit = 'Edit';
            var title = edit + ' meeting notes with ' + meeting.name;
            var meetingDate = Util.toYYYYMMDDHHMMSS(meeting.date, ' ');
            return (React.createElement("tr", { key: key },
                React.createElement("td", null, id),
                React.createElement("td", null, name),
                React.createElement("td", null, meetingDate),
                React.createElement("td", null,
                    React.createElement(Link, { className: 'btn btn-default', to: url, title: title },
                        React.createElement("span", { className: 'glyphicon glyphicon-edit' }),
                        " ",
                        edit))));
        });
        return (React.createElement("tbody", null, rows));
    };
    return MeetingRow;
}(React.Component));
export { MeetingRow };
//# sourceMappingURL=manage-row.js.map