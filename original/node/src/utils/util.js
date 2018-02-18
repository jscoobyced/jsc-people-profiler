var Util = (function () {
    function Util() {
    }
    Util.ready = function (a) {
        var w = window;
        var d = document;
        var c = 'addEventListener';
        d[c] ? d[c]('DOMContentLoaded', a) : w.attachEvent('onload', a);
    };
    Util.toYYYYMMDD = function (date) {
        return date.getFullYear() + '-'
            + Util.twoDigits(date.getMonth() + 1) + '-'
            + Util.twoDigits(date.getDate());
    };
    Util.toYYYYMMDDHHMMSS = function (date, timeSeparator) {
        if (timeSeparator === void 0) { timeSeparator = 'T'; }
        return date.getFullYear() + '-'
            + Util.twoDigits(date.getMonth() + 1) + '-'
            + Util.twoDigits(date.getDate()) + timeSeparator
            + Util.twoDigits(date.getHours()) + ':'
            + Util.twoDigits(date.getMinutes()) + ':'
            + Util.twoDigits(date.getSeconds());
    };
    Util.toUTC = function (date) {
        var newDate = new Date(date.getTime());
        newDate.setHours(newDate.getHours() - newDate.getTimezoneOffset() / 60);
        newDate.setMinutes(newDate.getMinutes() - (newDate.getTimezoneOffset() % 60));
        return newDate;
    };
    Util.twoDigits = function (num) {
        return ('0' + num).slice(-2);
    };
    Util.handleNetworkResponse = function (response) {
        switch (response.status) {
            case 404:
                throw new Error('Feature not implemented.');
            case 500:
                throw new Error('The server returned an error.');
            default:
                break;
        }
    };
    return Util;
}());
export default Util;
//# sourceMappingURL=util.js.map