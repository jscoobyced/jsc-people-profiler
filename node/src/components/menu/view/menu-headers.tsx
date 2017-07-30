import * as React from 'react';

export class MenuHeader extends React.Component<any, any> {
    render(): JSX.Element {
        return (
            <div className='navbar-header'>
                <button type='button' className='navbar-toggle'
                    data-toggle='collapse' data-target='.navbar-collapse'>
                    <span className='sr-only'>Toggle navigation</span>
                    <span className='icon-bar'></span>
                    <span className='icon-bar'></span>
                    <span className='icon-bar'></span>
                </button>
            </div>);
    }
}