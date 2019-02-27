import React, { Component } from 'react';
import AuthStore from './auth/authReduceStore';
import FriendStore from './friend/friendReduceStore';
const { BrowserRouter } = require('react-router-dom');
import App from '../App';
import AuthDispatcher from "./auth/authAction";

/**
 * Flux Container 認証と友達情報を管理
 */
class FluxContainer extends Component<any, any> {

    static getStores() {
        return [AuthStore, FriendStore]; //利用したいReduceStore
    }

    static calculateState() {
        return { //container内で`this.state.KEY_NAME`でアクセス可能
            auth: AuthStore.getState(),
            friend: FriendStore.getState()
        };
    }

    //ロード時の認証チェック
    componentWillMount() {
        AuthDispatcher.authCheckState();
    }

    render() {

        return (
            <div>
                <BrowserRouter>
                    <App {...this.state} />
                </BrowserRouter>
            </div>
        );
    }
}

export default FluxContainer;