import * as React from 'react';

export interface ModalProps {
    name: string;
    title: string;
    content: JSX.Element;
    close: string;
    do: string;
    done?: string;
    closeAction?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
    doAction?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
    doneAction?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

export class Modal extends React.Component<ModalProps, ModalProps> {

    render(): JSX.Element {
        let closeAction: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = () => { };
        if (this.props.closeAction) {
            closeAction = this.props.closeAction;
        }
        let doAction: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = () => { };
        if (this.props.doAction) {
            doAction = this.props.doAction;
        }
        let doneAction: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = () => { };
        if (this.props.doneAction) {
            doneAction = this.props.doneAction;
        }
        let doneButton: JSX.Element;
        if (this.props.done) {
            doneButton = <button type='button' className='btn btn-default'
                onClick={doneAction}>{this.props.done}</button>;
        }

        return (
            <div className='mmodal' id={this.props.name} role='dialog'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <button type='button' className='close'
                                onClick={closeAction}>&times;</button>
                            <h4 className='modal-title'>{this.props.title}</h4>
                        </div>
                        <div className='modal-body'>
                            {this.props.content}
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-default'
                                onClick={doAction}>{this.props.do}</button>
                            {doneButton}
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}