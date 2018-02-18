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
var ProfileRow = (function (_super) {
    __extends(ProfileRow, _super);
    function ProfileRow(props) {
        var _this = _super.call(this, props) || this;
        _this.state = props;
        return _this;
    }
    ProfileRow.prototype.render = function () {
        var _this = this;
        var rows = this.state.profiles.map(function (profile, key) {
            var url = _this.state.baseUrl + '/' + profile.id;
            var edit = 'Edit';
            var title = edit + ' ' + profile.firstName;
            var startDate = Util.toYYYYMMDD(profile.startDate);
            return (React.createElement("tr", { key: key },
                React.createElement("td", null, profile.id),
                React.createElement("td", null, profile.firstName),
                React.createElement("td", null, profile.lastName),
                React.createElement("td", null, profile.positionName),
                React.createElement("td", null, startDate),
                React.createElement("td", null,
                    React.createElement(Link, { className: 'btn btn-default', to: url, title: title },
                        React.createElement("span", { className: 'glyphicon glyphicon-edit' }),
                        " ",
                        edit))));
        });
        return (React.createElement("tbody", null, rows));
    };
    return ProfileRow;
}(React.Component));
export { ProfileRow };
//# sourceMappingURL=profile-row.js.map