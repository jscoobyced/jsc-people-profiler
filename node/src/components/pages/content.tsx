import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import { Page as Home } from './home/view/home';
import { Page as ManageProfile } from './profiles/view/manage';
import { Page as EditProfile } from './profiles/view/edit';
import { Page as Meeting } from './meeting/view/manage';
import { Page as Action } from './meeting/view/actions';
import { Page as Help } from './help/view/help';
import { Page as About } from './about/view/about';
import { Page as Settings } from './settings/view/settings';

export class Content extends React.Component<any, any>  {

    render(): JSX.Element {
        return (
            <Router>

                <div>
                    <Route exact path='/' component={Home} />
                    <Route path='/profiles/manage' component={ManageProfile} />
                    <Route path='/profiles/edit/:id' component={EditProfile} />
                    <Route path='/meeting/manage' component={Meeting} />
                    <Route path='/meeting/action' component={Action} />
                    <Route path='/help' component={Help} />
                    <Route path='/about' component={About} />
                    <Route path='/settings' component={Settings} />
                </div>
            </Router>
        );
    }
}