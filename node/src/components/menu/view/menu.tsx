import * as React from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';

export class Menu extends React.Component<any, any> {

    render(): JSX.Element {
        return (
            <Router>
                <div className='container'>
                    <ul className='nav navbar-nav'>
                        <li><Link to='/' title='Home page of the profiler application'>Home</Link></li>
                        <li><Link to='#' title='Profiles, meeting and action entries'>Profiles<b className='caret'></b></Link>
                            <ul>
                                <li><Link to='/profiles/manage' title='Manage profiles'>Manage</Link></li>
                                <li><Link to='/meeting/manage' title='Meeting notes'>Meetings</Link></li>
                                <li><Link to='/meeting/action' title='Action entries with deadlines'>Actions</Link></li>
                            </ul>
                        </li>
                        </ul>
                        <ul className='nav navbar-nav navbar-right'>
                        <li><Link to='#' title='General configuration and info'>Other<b className='caret'></b></Link>
                            <ul>
                                <li><Link to='/settings' title='General configurations'>Settings</Link></li>
                                <li><Link to='/help' title='Help page of the profiler application'>Help</Link></li>
                                <li><Link to='/about' title='About this application and its creator(s)'>About</Link> </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </Router>
        );
    }
}