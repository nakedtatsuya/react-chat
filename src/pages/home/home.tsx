import React, { Component } from 'react';
const { Route, Switch } = require('react-router-dom');
const classes = require('./home.css');
import LoginForm from '../../organisms/FormBox/loginForm/loginForm';
import SignupForm from '../../organisms/FormBox/signupForm/signupForm';
import NewPassword from '../../organisms/FormBox/newPassword/newPassword';
const { Link, withRouter } = require('react-router-dom');

class Login extends Component<any, any> {

    render() {
        return (
            <>
                <Switch>
                    <Route path="/home/login" exact render={() => (
                        <LoginForm {...this.props} />
                    )} />
                    <Route path="/home/sign_up" exact render={() => (
                        <SignupForm {...this.props} />
                    )} />
                    <Route path="/home/password/new" exact component={NewPassword} />
                </Switch>
            </>
        );
    }
}

export default withRouter(Login);
