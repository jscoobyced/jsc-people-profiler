import * as React from 'react';
import { PageProps } from '../../page-models';

export class Page extends React.Component<PageProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: this.props.name
        };
    }

    render(): JSX.Element {
        return (
            <div className='row'>
                <div className='col-md-6 col-md-offset-3'>
                    <form id='registration'>
                        <div className='row'>
                            <h1>Manage Members</h1>
                        </div>
                        <div className='row'>
                            <div className='input-group'>
                                <label htmlFor='firstname' className='sr-only'>Firstname</label>
                                <span className='input-group-addon'><i className='glyphicon glyphicon-font'></i></span>
                                <input type='text' id='firstname' className='form-control' placeholder='Enter your firstname' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-group'>
                                <label htmlFor='lastname' className='sr-only'>Lastname</label>
                                <span className='input-group-addon'><i className='glyphicon glyphicon-font'></i></span>
                                <input type='text' id='lastname' className='form-control' placeholder='Enter your lastname' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-group'>
                                <label htmlFor='email' className='sr-only'>Email</label>
                                <span className='input-group-addon'><i className='glyphicon glyphicon-user'></i></span>
                                <input type='email' id='email' className='form-control' placeholder='Enter you email' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-group'>
                                <label htmlFor='password' className='sr-only'>Password</label>
                                <span className='input-group-addon'><i className='glyphicon glyphicon-lock'></i></span>
                                <input type='password' id='password' className='form-control' placeholder='Type your password' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-group'>
                                <label htmlFor='password2' className='sr-only'>Re-Enter password</label>
                                <span className='input-group-addon'><i className='glyphicon glyphicon-lock'></i></span>
                                <input type='password' id='password2' className='form-control' placeholder='Re-type your password' />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        <button type='reset' className='btn btn-primary'>Clear</button>
                    </form>
                </div>
            </div>
        );
    }
}