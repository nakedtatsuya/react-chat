import AuthDispatcher from '../dispatcher';
import actionTypes from '../actionTypes';
import axios from '../../axios-order';
import friendDispatcher from "../friend/friendAction";

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
            .then( (response: any) => {

                localStorage.setItem('access-token', response.headers.accesstoken);
                localStorage.setItem('uid', response.headers.uid);
                localStorage.setItem('client', response.headers.client);
                this.authSuccess(response, 'ChatAppへようこそ！早速、ユーザーを探してチャットを始めよう！');
                this.checkAuthTimeout(parseInt(response.headers.expiry));
            } )
            .catch( (error: any) => {
                console.log(error.response.data.errors.full_messages);
                this.authFail(error.response.data.errors.full_messages);
            } );
    },

    checkAuthTimeout(expiry: number) {
        setTimeout(() => {
            this.logout();
        }, expiry)
    },

    authCheckState() {
        this.authCheckStart();
        const accessToken = localStorage.getItem('access-token');
        const uid = localStorage.getItem('uid');
        const client = localStorage.getItem('client');
        axios.get('/auth/validate_token', {
            headers: {
                accessToken,
                uid,
                client
            },
        }).then((response: any) => {
            this.authSuccess(response);
        }).catch((error: any) => {
            this.authEnd();
        });
    },

    auth(email: string, password: string) {
        this.authStart();
        const formData = {email, password};
        axios.post( '/auth/sign_in', formData )
            .then( (response: any) => {
                localStorage.setItem('access-token', response.headers.accesstoken);
                localStorage.setItem('uid', response.headers.uid);
                localStorage.setItem('client', response.headers.client);

                this.authSuccess(response, 'ログインしました！');
                this.checkAuthTimeout(parseInt(response.headers.expiry));
            })
            .catch( (error: any) => {
                console.log(error.response.data.errors[0]);
                this.authFail(error.response.data.errors);
            });
    },

    // put(name: string, email: string, headers: any, history: any) {
    //     this.authStart();
    //     axios.put(`/auth`, {
    //             name,
    //             email,
    //         },
    //         headers,
    //     ).then((response: any) => {
    //
    //         console.log(response);
    //         this.authSuccess(response, 'プロフィールを更新しました');
    //         history.replace(`/users/${response.data.data.id}`);
    //     }).catch((error: any) => {
    //         this.authFail(error);
    //     });
    // },

    putPassword(password: string, password_confirmation: string, headers: any, history: any) {
        this.authStart();
        axios.put(`/auth/password`, {
                password,
                password_confirmation
            },
            headers,
        ).then((response: any) => {
            console.log(response);
            this.authSuccess(response, 'プロフィールを更新しました');
            history.replace(`/users/${response.data.data.id}`);
        }).catch((error: any) => {
            console.log(error.response.data.errors.full_messages);
            this.authFail(error.response.data.errors.full_messages);
        });
    },

    async putImage(params: any, props: any, password: string, password_confirmation: string){
        let failErrors: any = null;
        let successResponse: any = null;
        const oldName: any = props.auth.currentUser.name;
        const oldEmail: any = props.auth.currentUser.email;
        const oldImage: any = props.auth.currentUser.image;
        await axios.put(`/users/image`, params, {
            headers: props.auth.headers
        }).then((response: any) => {
            localStorage.setItem('uid', response.headers.uid);
            console.log(response);
            successResponse = response;
        }).catch((error: any) => {
            console.log(error.response.data);
            failErrors = error.response.data.errors.full_messages;
            this.authFail(failErrors);
        });
        //name/emailでエラーが出たらパスワード処理は行わない。
        if(failErrors) return;

        if(password !== '') {
            await axios.put(`/auth/password`, {
                    password,
                    password_confirmation
                },
                {
                    headers: {
                        accessToken: localStorage.getItem('access-token'),
                        uid: localStorage.getItem('uid'),
                        client: localStorage.getItem('client'),
                    }
                },
            ).then((response: any) => {
                console.log(response);
                successResponse = response;
            }).catch((error: any) => {
                console.log(error.response.data);
                if(failErrors !== null){
                    failErrors = failErrors.concat(error.response.data.errors.full_messages);
                    console.log(failErrors);
                }else {
                    failErrors = error.response.data.errors.full_messages;
                }
            });
        }

        if(!failErrors) {
            this.authSuccess(successResponse, 'プロフィールを更新しました');
            props.history.replace(`/users/${successResponse.data.data.id}`);
        }else if(successResponse){
            //ロールバック
            params.append('name', oldName);
            params.append('email', oldEmail);
            params.append('image', oldImage);
            await axios.put(`/users/image`, params, {
                headers: {
                    accessToken: localStorage.getItem('access-token'),
                    uid: localStorage.getItem('uid'),
                    client: localStorage.getItem('client'),
                }
            }).then((response: any) => {
                localStorage.setItem('uid', response.headers.uid);
                console.log(response);
                successResponse = null;
            }).catch((error: any) => {
                console.log(error.response.data);
            });
            this.authFail(failErrors);
        }else {
            this.authFail(failErrors);
        }

    },

    authStart() {
        AuthDispatcher.dispatch({
            type: actionTypes.AUTH_START,
        });
    },

    authCheckStart() {
        AuthDispatcher.dispatch({
            type: actionTypes.AUTH_CHECK_START,
        });
    },

    authSuccess(response: any, success: string|null = null) {
        AuthDispatcher.dispatch({
            type: actionTypes.AUTH_SUCCESS,
            token: response.headers.accesstoken,
            uid: response.headers.uid,
            client: response.headers.client,
            currentUser: response.data.data,
            success: success
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