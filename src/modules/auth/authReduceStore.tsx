import { ReduceStore } from 'flux/utils';
import AuthDispatcher from '../dispatcher';
import actionTypes from '../actionTypes';
import { updateObject } from '../utility';

/**
 * 認証系
 */
class AuthStore extends ReduceStore<any, any> {
    getInitialState() {
        return {
            headers: {
                accessToken: null,
                uid: null,
                client: null,
            },
            error: null,
            loading: false,
            isLoggedIn: false,
            currentUser: null,
            authCheckLoading: false,
            success: null
        }; //stateの初期値を定義
    }

    reduce(state: any, action: any) {
        switch (action.type) {
            case actionTypes.AUTH_START:
                return authStart(state);
            case actionTypes.AUTH_SUCCESS:
                return authSuccess(state, action);
            case actionTypes.AUTH_FAIL:
                console.log(actionTypes.AUTH_FAIL);
                return authFail(state, action);
            case actionTypes.AUTH_LOGOUT:
                console.log(actionTypes.AUTH_LOGOUT);
                return authLogout(state);
            case actionTypes.AUTH_END:
                console.log(actionTypes.AUTH_END);
                return authEnd(state);
            case actionTypes.AUTH_CHECK_START:
                console.log(actionTypes.AUTH_CHECK_START);
                return authCheckStart(state);
            default:
                return state;
        }
    }
}

const authStart = (state: any) => {
    return updateObject(state, {error: null, loading: true});
};

const authCheckStart = (state: any) => {
    return updateObject(state, {error: null, authCheckLoading: true});
};

const authEnd = (state: any) => {
    return updateObject(state, {error: null, loading: false, authCheckLoading: false});
};

const authSuccess = (state: any, action: any) => {
    return updateObject(state, {
        headers: {
            accessToken: action.token,
            uid: action.uid,
            client: action.client,
        },
        error: null,
        loading: false,
        isLoggedIn: true,
        currentUser: action.currentUser,
        authCheckLoading: false,
        success: action.success
    });
};

const authFail = (state: any, action: any) => {
    return updateObject(state, {error: action.error, loading: false});
};

const authLogout = (state: any) => {
    return updateObject(state, {
        headers: {
            token: null,
            uid: null,
            client: null,
        },
        error: null,
        loading: false,
        isLoggedIn: false,
        currentUser: null
    });
};

export default new AuthStore(AuthDispatcher);