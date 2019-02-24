import React, { Component, FormEvent } from 'react';
import Button from "../../../atoms/button/Button/Button";
import Input from "../../../atoms/input/Input";
import axios from '../../../axios-order';

const classes = require('./signupForm.css');
const button = require('../../../atoms/button/Button/Button.css');
const { Link, withRouter } = require('react-router-dom');
import HomeImage from '../../../atoms/homeImage/homeImage';
import AuthAction from '../../../modules/auth/authAction';
import Spinner from '../../../atoms/Spinner/Spinner';

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

interface Props {
    history: {
        push(url: string): void;
    };
}

const isProperty = (value: string): value is (keyof signUpForm) => {
    return value === 'name' || value === 'email' || value === 'password' || value === 'password_confirmation';
};

class SignupForm extends Component<any, State> {


    state: State = {
        signUpForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'ユーザー名',
                    type: 'text',
                    maxLength: "20",
                    required: true,
                    autoFocus: true
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false,
                    minLength: 1,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'メールアドレス',
                    type: 'email',
                    required: true,
                    maxLength: "255"
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    minLength: 1,
                    maxLength: 255
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'パスワード',
                    type: 'password',
                    required: true,
                    maxLength: '16',
                    minLength: '8'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false,
                    minLength: 8,
                    maxLength: 16
                },
                valid: false,
                touched: false
            },
            password_confirmation: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'パスワード',
                    type: 'password',
                    required: true,
                    maxLength: "16",
                    minLength: '8'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false,
                    minLength: 8,
                    maxLength: 16
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    };

    checkValidity(value: string, rules: Validation) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    /**
     * 会員登録送信アクション
     * @param {HTMLElementEvent<HTMLInputElement>} event
     */
    submitHandler = ( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData : SubmitConfig = {name: '', email: '', password: '', password_confirmation: ''};
        for (let formElementIdentifier in this.state.signUpForm) {
            if (isProperty(formElementIdentifier)) {
                formData[formElementIdentifier] = this.state.signUpForm[formElementIdentifier].value;
            }
        }
        AuthAction.signUp(formData);
    };

    /**
     * input入力アクション
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
                    valid: this.checkValidity(event.target.value, this.state.signUpForm[controlName].validation)
                }
            };
            this.setState({signUpForm: updateControls});
        }
    };

    componentDidMount() {
        AuthAction.authEnd();
    }

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
            errorMessage = (
                <p style={{color: 'red'}}>{this.props.auth.error.message}</p>
            );
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
