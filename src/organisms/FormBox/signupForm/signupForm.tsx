import React, { Component, FormEvent } from 'react';
import Button from "../../../atoms/button/Button/Button";
import Input from "../../../atoms/input/Input";

const classes = require('./signupForm.css');
const button = require('../../../atoms/button/Button/Button.css');
const { Link, withRouter } = require('react-router-dom');
import HomeImage from '../../../atoms/homeImage/homeImage';
import AuthDispatcher from "../../../modules/auth/authAction";
import Spinner from '../../../atoms/Spinner/Spinner';
import {checkValidity, emailConfig, nameConfig, passwordConfig} from '../../../modules/utility';

interface signUpForm {
    name: ControlConfig,
    email: ControlConfig,
    password: ControlConfig,
    password_confirmation: ControlConfig
}
interface State {
    signUpForm: signUpForm,
    formIsValid: boolean
}

interface Validation {
    required: boolean,
    isEmail: boolean,
    minLength: number,
    maxLength: number
}

interface ControlConfig {
    elementType: string,
    elementConfig: any,
    value: string,
    validation: Validation,
    valid: boolean,
    touched: boolean
}

interface SubmitConfig {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

interface HTMLElementEvent<T extends HTMLElement> extends Event {
    target: T;
}

//返り値を保証するメソッド
const isProperty = (value: string): value is (keyof signUpForm) => {
    return value === 'name' || value === 'email' || value === 'password' || value === 'password_confirmation';
};

/**
 * 会員登録画面フォーム
 */
class SignupForm extends Component<any, State> {

    state: State = {
        signUpForm: {
            name: nameConfig(),
            email: emailConfig(),
            password: passwordConfig('パスワード'),
            password_confirmation: passwordConfig('パスワード確認')
        },
        formIsValid: false
    };

    /**
     * 会員登録送信アクション
     * @param {HTMLElementEvent<HTMLInputElement>} event
     */
    submitHandler = ( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData : SubmitConfig = {name: '', email: '', password: '', password_confirmation: ''};
        //各formStateから値を取得して新しいハッシュ作成、送信
        for (let formElementIdentifier in this.state.signUpForm) {
            if (isProperty(formElementIdentifier)) {
                formData[formElementIdentifier] = this.state.signUpForm[formElementIdentifier].value;
            }
        }
        AuthDispatcher.signUp(formData);
    };

    /**
     * input入力アクション
     * stateにフォーム情報があるので、input更新
     * @param {HTMLElementEvent<HTMLInputElement>} event
     * @param {string} controlName
     */
    inputChangeHandler = (event: HTMLElementEvent<HTMLInputElement>, controlName: string) => {
        if (isProperty(controlName)) {
            const updateControls = {
                ...this.state.signUpForm,
                [controlName]: {
                    ...this.state.signUpForm[controlName],
                    touched: true,
                    value: event.target.value,
                    valid: checkValidity(event.target.value, this.state.signUpForm[controlName].validation)
                }
            };
            this.setState({signUpForm: updateControls});
        }
    };

    render() {

        const formElementsArray = [];
        for (let key in this.state.signUpForm) {
            if (isProperty(key)) {
                formElementsArray.push({
                    id: key,
                    config: this.state.signUpForm[key]
                });
            }
        }
        let form: any = (
            formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event: HTMLElementEvent<HTMLInputElement>) => this.inputChangeHandler(event, formElement.id)}
                />
            ))
        );

        if (this.props.auth.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;

        if (this.props.auth.error) {
            errorMessage = this.props.auth.error.map((err: string) => {
                return  <p key={err} style={{color: 'red'}}>{err}</p>;
            });
            this.props.auth.error = null;
        }

        return (
            <div className={classes.LoginWrapper}>
                {errorMessage}
                <div className={classes.FormWrapper}>
                    <form className={classes.LoginForm} onSubmit={this.submitHandler}>
                        <h2 className={classes.Title}>Chatを始めよう</h2>
                        {form}
                        <Button click={() => {}} buttonType={button.Login}>新規登録</Button>
                        <div className={classes.LinkContainer}>
                            <Link to={'/home/login'}>ログインはこちら</Link>
                        </div>
                    </form>
                </div>
                <HomeImage />
            </div>
        );
    }
}

export default withRouter(SignupForm);
