var Key = (function () {
    function Key() {
        this._index = 0;
    }
    Key.prototype.next = function () {
        return this._index++;
    };
    return Key;
}());
export default Key;
//# sourceMappingURL=key.js.map