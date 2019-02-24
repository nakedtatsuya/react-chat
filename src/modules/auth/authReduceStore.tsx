import { ReduceStore } from 'flux/utils';
import AuthDispatcher from './authDispatcher';
import actionTypes from './authActionTypes';
import { updateObject } from '../utility';
import FluxContainer from "../../fluxContainer";

class AuthStore extends ReduceStore<any, any> {
    getInitialState() {
        return {
            token: null,
            uid: null,
            client: null,
            error: null,
            loading: false,
            isLoggedIn: false,
            currentUser: null,
        }; //stateの初期値を定義
    }

    reduce(state: any, action: any) {
        switch (action.type) {
            case actionTypes.AUTH_START:
                console.log(actionTypes.AUTH_START);
                return authStart(state, action);
            case actionTypes.AUTH_SUCCESS:
                console.log(actionTypes.AUTH_SUCCESS);
                return authSuccess(state, action);
            case actionTypes.AUTH_FAIL:
                console.log(actionTypes.AUTH_FAIL);
                return authFail(state, action);
            case actionTypes.AUTH_LOGOUT:
                console.log(actionTypes.AUTH_LOGOUT);
                return authLogout(state, action);
            case actionTypes.AUTH_END:
                console.log(actionTypes.AUTH_END);
                return authEnd(state, action);
            default:
                console.log('not execute');
                return state;
        }
    }
}

const authStart = (state: any, action: any) => {
    return updateObject(state, {error: null, loading: true});
};

const authEnd = (state: any, action: any) => {
    return updateObject(state, {error: null, loading: false});
};

const authSuccess = (state: any, action: any) => {
    return updateObject(state, {
        token: action.token,
        uid: action.uid,
        client: action.client,
        error: null,
        loading: false,
        isLoggedIn: true,
        currentUser: action.currentUser
    });
};

const authFail = (state: any, action: any) => {
    return updateObject(state, {error: action.error, loading: false});
};

const authLogout = (state: any, action: any) => {
    return updateObject(state, {token: null,
        uid: null,
        client: null,
        error: null,
        loading: false,
        isLoggedIn: false,
        currentUser: null});
};

export default new AuthStore(AuthDispatcher);