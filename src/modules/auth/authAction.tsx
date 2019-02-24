import AuthDispatcher from './authDispatcher';
import actionTypes from './authActionTypes';
import axios from '../../axios-order';
import FluxContainer from "../../fluxContainer";

const AuthActionCreators = {   //ActionCreators

    logout(){
        localStorage.removeItem('access-token');
        localStorage.removeItem('uid');
        localStorage.removeItem('client');
        AuthDispatcher.dispatch({
            type: actionTypes.AUTH_LOGOUT,
        });
    },

    signUp(formData: {name: string, email: string, password: string, password_confirmation: string}) {
        this.authStart();
        axios.post( '/auth', formData )
            .then( response => {
                localStorage.setItem('access-token', response.headers.accesstoken);
                localStorage.setItem('uid', response.headers.uid);
                localStorage.setItem('client', response.headers.client);
                this.authSuccess(response);
                this.checkAuthTimeout(parseInt(response.headers.expiry));
            } )
            .catch( error => {
                console.log(error);
                this.authFail(error);
            } );
    },

    checkAuthTimeout(expiry: number) {
        setTimeout(() => {
            this.logout();
        }, expiry)
    },

    authCheckState() {
        this.authStart();
        const accessToken = localStorage.getItem('access-token');
        const uid = localStorage.getItem('uid');
        const client = localStorage.getItem('client');
        axios.get('/auth/validate_token', {
            headers: {
                accessToken,
                uid,
                client
            },
        }).then(res => {
            this.authSuccess(res);
        }).catch(error => {
            this.authEnd();
        });
    },

    auth(email: string, password: string) {
        this.authStart();
        const formData = {email, password};
        axios.post( '/auth/sign_in', formData )
            .then( response => {
                localStorage.setItem('access-token', response.headers.accesstoken);
                localStorage.setItem('uid', response.headers.uid);
                localStorage.setItem('client', response.headers.client);

                this.authSuccess(response);
                this.checkAuthTimeout(parseInt(response.headers.expiry));
            })
            .catch( error => {
                console.log(error);
                this.authFail(error);
            });
    },

    put(name: string, email: string, headers: any, history: any) {
        this.authStart();
        axios.put(`/auth`, {
            name,
            email
        },
            headers,
        ).then((response) => {
            console.log(response);
            this.authSuccess(response);
            history.replace(`/users/${response.data.data.id}`);
        }).catch(e => {
            console.log(e);
            this.authFail(e);
        });
    },

    putPassword(password: string, password_confirmation: string, headers: any, history: any) {
        this.authStart();
        axios.put(`/auth/password`, {
                password,
                password_confirmation
            },
            headers,
        ).then((response) => {
            console.log(response);
            this.authSuccess(response);
            history.replace(`/users/${response.data.data.id}`);
        }).catch(e => {
            console.log(e);
            this.authFail(e);
        });
    },

    authStart() {
        AuthDispatcher.dispatch({
            type: actionTypes.AUTH_START,
        });
    },

    authSuccess(response: any) {
        AuthDispatcher.dispatch({
            type: actionTypes.AUTH_SUCCESS,
            token: response.headers.accesstoken,
            uid: response.headers.uid,
            client: response.headers.client,
            currentUser: response.data.data
        });
    },

    authFail(error: any) {
        AuthDispatcher.dispatch({
            type: actionTypes.AUTH_FAIL,
            error: error,
        });
    },

    authEnd() {
        AuthDispatcher.dispatch({
            type: actionTypes.AUTH_END,
        });
    },

};

export default AuthActionCreators;