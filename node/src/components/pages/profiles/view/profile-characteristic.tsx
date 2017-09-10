import * as React from 'react';

import { ProfileDetailProps, Characteristic } from '../models/profile';
import { Modal } from '../../../../utils/modal';

export class ProfileCharacteristic extends React.Component<ProfileDetailProps, ProfileDetailProps> {

    private characteristicToAdd: Characteristic;

    constructor(props: ProfileDetailProps) {
        super(props);
        this.state = props;
    }

    private createModalContent(): JSX.Element {
        if (!this.props.allCharacteristics) {
            return (<div />);
        }
        return (
            <div>
                <select id='characteristics'
                    onChange={this.handleAdd}
                    className='form-control'>
                    {
                        this.props.allCharacteristics.map(function (characteristic, key) {
                            return <option key={key}
                                value={characteristic.id}>{characteristic.name}</option>;
                        })
                    }
                </select>
            </div>
        );
    }

    private handleAdd = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.currentTarget.id && parseInt(event.currentTarget.id) !== 0) {
            this.characteristicToAdd = {
                id: parseInt(event.currentTarget.id),
                name: event.currentTarget.options[event.currentTarget.selectedIndex].text
            };
        } else {
            this.characteristicToAdd = null;
        }
    }

    private closeAction = (): React.EventHandler<React.MouseEvent<HTMLButtonElement>> => {
        if (this.characteristicToAdd) {
            const characteristics = this.state.characteristics;
            characteristics.push(this.characteristicToAdd);
            this.setState({
                characteristics: characteristics
            });
        }
        return null;
    }

    render(): JSX.Element {
        const addCharacteristicElement = this.createModalContent();
        const addButton = (
            <div>
                <button className='btn btn-default'
                    data-toggle='modal'
                    data-target='#characteristicModal'
                    title='Add'>
                    <span className='glyphicon glyphicon-plus'></span>
                    Add
                </button>
                <Modal close='Add' closeAction={this.closeAction}
                    title='Add characteristic'
                    name='characteristicModal'
                    content={addCharacteristicElement} />
            </div>
        );
        return (
            <div>
                <div className='row'>
                    <h2>Characteristics</h2>
                    <ul>
                        {this.state.characteristics.map((characteristic, key) => {
                            return (
                                <li key={key}>{characteristic.name}</li>
                            );
                        })}
                    </ul>
                </div>
                <div className='row'>
                    {addButton}
                </div>
            </div>
        );
    }
}