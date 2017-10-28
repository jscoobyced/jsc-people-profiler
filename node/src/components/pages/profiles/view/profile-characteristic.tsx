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
                    value={this.state.selectedCharacteristic}
                    onChange={this.handleAdd}
                    className='form-control'>
                    <option value='-1'>Choose an option</option>
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
                id: parseInt(event.currentTarget.options[event.currentTarget.selectedIndex].value),
                name: event.currentTarget.options[event.currentTarget.selectedIndex].text
            };
        } else {
            this.characteristicToAdd = null;
        }
        this.setState({
            selectedCharacteristic: this.characteristicToAdd.id
        });
    }

    private openAction = (): React.EventHandler<React.MouseEvent<HTMLButtonElement>> => {
        this.setState({
            showCharacteristicsModal: true,
            selectedCharacteristic: -1
        });
        return null;
    }

    private closeAction = (): React.EventHandler<React.MouseEvent<HTMLButtonElement>> => {
        this.setState({
            showCharacteristicsModal: false
        });
        return null;
    }

    private removeCharacteristic = (event: any): void => {
        console.log(event.constructor.name);
        const id = parseInt(event.target.getAttribute('data-id'));
        console.log(id);
        const profile = this.state.profile;
        const newCharacteristics: Array<Characteristic> = [];
        profile.characteristics.forEach(characteristic => {
            if (characteristic.id !== id) {
                newCharacteristics.push(characteristic);
            }
        });
        profile.characteristics = newCharacteristics;
        this.setState({
            profile: profile
        });
    }

    private doAction = (): React.EventHandler<React.MouseEvent<HTMLButtonElement>> => {
        if (this.characteristicToAdd) {
            const profile = this.state.profile;
            let found: boolean = false;
            profile.characteristics.forEach(characteristic => {
                if (characteristic.id === this.characteristicToAdd.id) {
                    found = true;
                    return;
                }
            });
            if (!found) {
                profile.characteristics.push(this.characteristicToAdd);
            }
            this.setState({
                profile: profile
            });
        }
        return this.closeAction();
    }

    render(): JSX.Element {
        const addCharacteristicElement = this.createModalContent();
        const addButton = (
            <button className='btn btn-default'
                onClick={this.openAction}
                title='Add'>
                <span className='glyphicon glyphicon-plus'></span>
                Add
                </button>
        );

        const modal = (
            <Modal close='Close' do='Add'
                closeAction={this.closeAction}
                doAction={this.doAction}
                title='Add characteristic'
                name='characteristicModal'
                content={addCharacteristicElement} />
        );
        return (
            <div>
                {
                    this.state.showCharacteristicsModal ?
                        <div className='row'>
                            {modal}
                        </div> : null
                }
                <div className='row'>
                    <div className='col-md-7'>
                        <span className='big'>Characteristics</span>
                    </div>
                    <div className='col-md-3'>
                        {addButton}
                    </div>
                </div>
                <div className='row'>
                    <ul>
                        {this.state.profile.characteristics.map((characteristic, key) => {
                            return (
                                <li key={key} className='li-200'>
                                    <span className='col-md-10'>{characteristic.name}</span>
                                    <span onClick={this.removeCharacteristic}
                                        data-id={characteristic.id}
                                        className='col-md-2 pull-right glyphicon glyphicon-remove text-danger'></span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}