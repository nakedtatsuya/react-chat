import React, {Component, FormEvent} from 'react';
import Button from "../../../atoms/button/Button/Button";
const classes = require('./loginForm.css');
const button = require('../../../atoms/button/Button/Button.css');
const { Link, withRouter } = require('react-router-dom');
import HomeImage from '../../../atoms/homeImage/homeImage';
import Input from "../../../atoms/input/Input";
import Spinner from '../../../atoms/Spinner/Spinner';
import AuthDispatcher from "../../../modules/auth/authAction";
import {checkValidity, emailConfig, passwordConfig} from '../../../modules/utility';


interface LoginForm {
    email: ControlConfig,
    password: ControlConfig
}
interface State {
    loginForm: LoginForm,
    formIsValid: boolean,
    loading: boolean
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
    email: string,
    password: string
}

interface HTMLElementEvent<T extends HTMLElement> extends Event {
    target: T;
}

const isProperty = (value: string): value is (keyof LoginForm) => {
    return value === 'email' || value === 'password';
};

/**
 * ログインフォーム
 */
class loginForm extends Component<any, State> {

    state: State = {
        loginForm: {
            email: emailConfig(),
            password: passwordConfig('パスワード')
        },
        formIsValid: false,
        loading: false
    };

    /**
     * ログインアクション
     * @param {HTMLElementEvent<HTMLInputElement>} event
     */
    submitHandler = ( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData : SubmitConfig = {email: '', password: ''};
        for (let formElementIdentifier in this.state.loginForm) {
            if (isProperty(formElementIdentifier)) {
                formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
            }
        }
        AuthDispatcher.auth(formData.email, formData.password);
    };

    /**
     * 入力ごとのアクション
     * @param {HTMLElementEvent<HTMLInputElement>} event
     * @param {string} controlName
     */
    inputChangeHandler = (event: HTMLElementEvent<HTMLInputElement>, controlName: string) => {
        if (isProperty(controlName)) {
            const updateControls = {
                ...this.state.loginForm,
                [controlName]: {
                    ...this.state.loginForm[controlName],
                    touched: true,
                    value: event.target.value,
                    valid: checkValidity(event.target.value, this.state.loginForm[controlName].validation)
                }
            };
            this.setState({loginForm: updateControls});
        }
    };

    render() {
        const formElementsArray = [];

        for (let key in this.state.loginForm) {
            if (isProperty(key)) {
                formElementsArray.push({
                    id: key,
                    config: this.state.loginForm[key]
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
        //errorメッセージがある時は表示
        let errorMessage = null;

        if (this.props.auth.error) {
            errorMessage = (
              <p style={{color: 'red'}}>{this.props.auth.error.message}</p>
            );
        }

        return (
            <div className={classes.LoginWrapper}>
                {errorMessage}
                <div className={classes.FormWrapper}>
                    <form className={classes.LoginForm} onSubmit={this.submitHandler}>
                        <h2 className={classes.Title}>Chatにログイン</h2>
                        {form}
                        <div className={[classes.FormGroup, classes.Label].join(' ')}>
                            <label>
                                <input key={'remember'} type="checkbox" value="1"/>
                                ログインしたままにする</label>
                        </div>
                        <Button click={() => {}} buttonType={button.Login}>ログイン</Button>
                        <div className={classes.LinkContainer}>
                            <Link to={'/home/sign_up'}>新規登録の方はこちら</Link>
                            <Link to={'/home/password/new'}>パスワードを忘れた場合</Link>
                        </div>
                    </form>
                </div>
                <HomeImage />
            </div>
        );
    }
}

export default withRouter(loginForm);
