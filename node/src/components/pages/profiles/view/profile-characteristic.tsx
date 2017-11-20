import * as React from 'react';

import { ProfileDetailProps, Characteristic } from '../models/profile';
import { Modal } from '../../../../utils/modal';

export class ProfileCharacteristic extends React.Component<ProfileDetailProps, ProfileDetailProps> {

    constructor(props: ProfileDetailProps) {
        super(props);
        this.state = props;
    }

    private createModalContent(): JSX.Element {
        if (!this.props.allCharacteristics) {
            return (<div />);
        }
        const selectedCharacteristic = this.state.selectedCharacteristic ?
            this.state.selectedCharacteristic
            : {
                id: -1,
                name: ''
            };
        return (
            <div>
                <select id='characteristics'
                    value={selectedCharacteristic.id}
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
            const characteristicToAdd = {
                id: parseInt(event.currentTarget.options[event.currentTarget.selectedIndex].value),
                name: event.currentTarget.options[event.currentTarget.selectedIndex].text
            };
            this.setState({
                selectedCharacteristic: characteristicToAdd
            });
        }
    }

    private openAction = (): React.EventHandler<React.MouseEvent<HTMLButtonElement>> => {
        this.setState({
            showModal: true,
            selectedCharacteristic: {
                id: -1,
                name: ''
            }
        });
        return null;
    }

    private closeAction = (): React.EventHandler<React.MouseEvent<HTMLButtonElement>> => {
        this.setState({
            showModal: false
        });
        return null;
    }

    private removeCharacteristic = (event: any): void => {
        const id = parseInt(event.target.getAttribute('data-id'));
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
        if (this.state.selectedCharacteristic) {
            const profile = this.state.profile;
            let found: boolean = false;
            profile.characteristics.forEach(characteristic => {
                if (characteristic.id === this.state.selectedCharacteristic.id) {
                    found = true;
                    return;
                }
            });
            if (!found) {
                profile.characteristics.push(this.state.selectedCharacteristic);
            }
            this.setState({
                profile: profile
            });
        }
        return null;
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
                doneAction={this.closeAction}
                done='Done'
                title='Add characteristic'
                name='characteristicModal'
                content={addCharacteristicElement} />
        );
        return (
            <div>
                {
                    this.state.showModal ?
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
                    {
                        this.state.profile
                            && this.state.profile.characteristics ?
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
                            </ul> : null
                    }
                </div>
            </div>
        );
    }
}