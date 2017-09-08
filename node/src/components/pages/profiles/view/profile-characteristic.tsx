import * as React from 'react';
import { ProfileDetailProps } from '../models/profile';

export class ProfileCharacteristic extends React.Component<ProfileDetailProps, ProfileDetailProps> {

    constructor(props: ProfileDetailProps) {
        super(props);
        this.state = props;
    }

    render(): JSX.Element {
        return (
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
        );
    }
}