import React, { Component } from 'react';
const { Route, Switch } = require('react-router-dom');
const classes = require('./home.css');
import LoginForm from '../../organisms/homeFormBox/loginForm/loginForm';
import SignupForm from '../../organisms/homeFormBox/signupForm/signupForm';
import NewPassword from '../../organisms/homeFormBox/newPassword/newPassword';


import HomeImage from '../../atoms/homeImage/homeImage';
import User from "../user/user";
import Search from "../search/search";
import Chat from "../chat/chat";

class Login extends Component {

    state = {
      isLogin: false
    };

    render() {


        const isLogin = false;


        return (
            <>
                <Switch>
                    <Route path="/home/login" exact component={LoginForm} />
                    <Route path="/home/sign_up" exact component={SignupForm} />
                    <Route path="/home/password/new" exact component={NewPassword} />
                </Switch>
            </>
        );
    }
}

export default Login;
