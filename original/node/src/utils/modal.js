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
var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Modal.prototype.render = function () {
        var closeAction = function () { };
        if (this.props.closeAction) {
            closeAction = this.props.closeAction;
        }
        var doAction = function () { };
        if (this.props.doAction) {
            doAction = this.props.doAction;
        }
        var doneAction = function () { };
        if (this.props.doneAction) {
            doneAction = this.props.doneAction;
        }
        var doneButton;
        if (this.props.done) {
            doneButton = React.createElement("button", { type: 'button', className: 'btn btn-default', onClick: doneAction }, this.props.done);
        }
        return (React.createElement("div", { className: 'mmodal', id: this.props.name, role: 'dialog' },
            React.createElement("div", { className: 'modal-dialog' },
                React.createElement("div", { className: 'modal-content' },
                    React.createElement("div", { className: 'modal-header' },
                        React.createElement("button", { type: 'button', className: 'close', onClick: closeAction }, "\u00D7"),
                        React.createElement("h4", { className: 'modal-title' }, this.props.title)),
                    React.createElement("div", { className: 'modal-body' }, this.props.content),
                    React.createElement("div", { className: 'modal-footer' },
                        React.createElement("button", { type: 'button', className: 'btn btn-default', onClick: doAction }, this.props.do),
                        doneButton)))));
    };
    return Modal;
}(React.Component));
export { Modal };
//# sourceMappingURL=modal.js.map