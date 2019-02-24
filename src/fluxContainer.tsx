import React, { Component } from 'react';
import AuthStore from './modules/auth/authReduceStore';
const { BrowserRouter } = require('react-router-dom');

import App from './App';
import AuthAction from "./modules/auth/authAction";

class _App extends Component<any, any> {

    static getStores() {
        return [AuthStore]; //利用したいReduceStore
    }

    static calculateState() {
        return { //container内で`this.state.KEY_NAME`でアクセス可能
            auth: AuthStore.getState(),
        };
    }

    componentWillMount() {
        AuthAction.authCheckState();
    }

    render() {

        return (
            <div>
                <BrowserRouter>
                    <App auth={this.state.auth} />
                </BrowserRouter>
            </div>
        );
    }
}

export default _App;