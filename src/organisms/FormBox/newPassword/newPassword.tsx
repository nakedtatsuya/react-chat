import React, {Component, FormEvent} from 'react';
import Button from "../../../atoms/button/Button/Button";
import {checkValidity, emailConfig} from "../../../modules/utility";
const classes = require('./newPassword.css');
const button = require('../../../atoms/button/Button/Button.css');
const { Link, withRouter } = require('react-router-dom');
import Input from "../../../atoms/input/Input";
import axios from "../../../axios-order";

/**
 * パスワードリセット
 * メール処理アクションをrailsで実装していないので動かない
 */
class newPassword extends Component<any, any> {

    state: any = {
        newPasswordForm: {
            email: emailConfig(),
        },
        formIsValid: false
    };

    submitHandler = ( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData : any = {
            email: this.state.newPasswordForm['email'].value,
            redirect_url: "http://localhost:3000"
        };
        axios.post( '/auth/password', formData )
            .then( (response: any) => {
                console.log(response);
            })
            .catch( (error: any) => {
                console.log(error);
            });
    };

    inputChangeHandler = (event: any, controlName: string) => {
            const updateControls = {
                ...this.state.newPasswordForm,
                [controlName]: {
                    ...this.state.newPasswordForm[controlName],
                    touched: true,
                    value: event.target.value,
                    valid: checkValidity(event.target.value, this.state.newPasswordForm[controlName].validation)
                }
            };
            this.setState({newPasswordForm: updateControls})
    };

    render() {
        let form: any = (
                <Input
                    key={'email'}
                    elementType={this.state.newPasswordForm.email.elementType}
                    elementConfig={this.state.newPasswordForm.email.elementConfig}
                    value={this.state.newPasswordForm.email.value}
                    invalid={!this.state.newPasswordForm.email.valid}
                    shouldValidate={this.state.newPasswordForm.email.validation}
                    touched={this.state.newPasswordForm.email.touched}
                    changed={(event: any) => this.inputChangeHandler(event, 'email')}
                />
        );

        return (
            <div className={classes.FormWrapper}>
                <h2 className={classes.Title}>パスワードをリセット</h2>
                <p>ご登録いただいたメールアドレスを入力してください。</p>
                <p>メールアドレス宛にパスワード変更ページのURLが記載されたメールを送信します。</p>
                <form className={classes.LoginForm} onSubmit={this.submitHandler}>
                    {form}
                    <Button click={() => console.log('')} buttonType={button.NewPassword}>パスワードをリセット</Button>
                    <div className={classes.LinkContainer}>
                        <Link to={'/home/login'}>ログインはこちら</Link>
                        <Link to={'/home/sign_up'}>新規登録の方はこちら</Link>
                    </div>
                </form>
            </div>
        );
    }
};

export default withRouter(newPassword);
