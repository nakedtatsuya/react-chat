import React, {Component, FormEvent} from 'react';
import Button from "../../../atoms/button/Button/Button";
import AuthAction from "../../../modules/auth/authAction";
const classes = require('./newPassword.css');
const button = require('../../../atoms/button/Button/Button.css');
const { Link, withRouter } = require('react-router-dom');
import Input from "../../../atoms/input/Input";
import Spinner from '../../../atoms/Spinner/Spinner';
import axios from "../../../axios-order";
import FluxContainer from "../../../fluxContainer";


class newPassword extends Component<any, any> {

    state: any = {
        newPasswordForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'メールアドレス',
                    type: 'email',
                    required: true,
                    autoFocus: true
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    maxLength: 255,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
        formIsValid: false
        }
    };

    checkValidity(value: string, rules: any) {
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

    submitHandler = ( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData : any = {
            email: this.state.newPasswordForm['email'].value,
            redirect_url: "http://localhost:3000"
        };
        axios.post( '/auth/password', formData )
            .then( response => {
                console.log(response);
            })
            .catch( error => {
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
                    valid: this.checkValidity(event.target.value, this.state.newPasswordForm[controlName].validation)
                }
            };
            this.setState({newPasswordForm: updateControls})
    };

    componentDidMount() {
        AuthAction.authEnd();
    }

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
