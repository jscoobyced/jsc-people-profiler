import * as React from 'react';

export interface ModalProps {
    name: string;
    title: string;
    content: JSX.Element;
    close: string;
    closeAction?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

export class Modal extends React.Component<ModalProps, ModalProps> {

    render(): JSX.Element {
        let closeAction: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = () => { };
        if (this.props.closeAction) {
            closeAction = this.props.closeAction;
        }
        return (
            <div className='modal fade' id={this.props.name} role='dialog'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <button type='button' className='close'
                                data-dismiss='modal'>&times;</button>
                            <h4 className='modal-title'>{this.props.title}</h4>
                        </div>
                        <div className='modal-body'>
                            {this.props.content}
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-default'
                                onClick={closeAction}
                                data-dismiss='modal'>{this.props.close}</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}