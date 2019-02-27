import React, {Component, FormEvent} from 'react';
import Button from "../../../atoms/button/Button/Button";
const classes = require('./editForm.css');
const button = require('../../../atoms/button/Button/Button.css');
import Input from "../../../atoms/input/Input";
import AuthDispatcher from "../../../modules/auth/authAction";
import axios from '../../../axios-order';
import {checkValidity, emailConfig, nameConfig, passwordConfig} from '../../../modules/utility';

interface editForm {
    name: ControlConfig,
    email: ControlConfig,
    password: ControlConfig,
    password_confirmation: ControlConfig
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

interface HTMLElementEvent<T extends HTMLElement> extends Event {
    target: T;
}
const isProperty = (value: string): value is (keyof editForm) => {
    return value === 'name' || value === 'email' || value === 'password' || value === 'password_confirmation';
};

/**
 * ユーザー編集フォーム
 */
class editForm extends Component<any, any> {

    state: any = {
        editForm: {
            name: nameConfig(this.props.auth.currentUser.name),
            email: emailConfig(this.props.auth.currentUser.email),
            password: passwordConfig('新しいパスワード'),
            password_confirmation: passwordConfig('新しいパスワードの確認')
        },
        formIsValid: false
    };

    /**
     * 送信したときの処理
     * @param {<HTMLFormElement>} event
     */
    submitHandler = ( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData : any = {name: '', email: '', password: '', password_confirmation: ''};
        for (let formElementIdentifier in this.state.editForm) {
            if (isProperty(formElementIdentifier)) {
                formData[formElementIdentifier] = this.state.editForm[formElementIdentifier].value;
            }
        }

        //認証にはヘッダーが必要
        const headers = this.props.auth.headers;

        /**
         * device_auth_tokenの仕様上プロフィール編集とパスワード編集は別処理
         * なので、別々のアクションにした
         */
        //プロフィール編集
        if(formData.name !== this.props.auth.currentUser.name || formData.email !== this.props.auth.currentUser.email) {
            AuthDispatcher.put(formData.name, formData.email, {headers},this.props.history);
        }
        //パスワード変更
        if(formData.password !== null && formData.password !== '') {
            AuthDispatcher.putPassword(formData.password, formData.password_confirmation, {headers}, this.props.history);
        }
    };

    /**
     * input入力アクション
     * @param {HTMLElementEvent<HTMLInputElement>} event
     * @param {string} controlName
     */
    inputChangeHandler = (event: HTMLElementEvent<HTMLInputElement>, controlName: string) => {
        if (isProperty(controlName)) {
            const updateControls = {
                ...this.state.editForm,
                [controlName]: {
                    ...this.state.editForm[controlName],
                    touched: true,
                    value: event.target.value,
                    valid: checkValidity(event.target.value, this.state.editForm[controlName].validation)
                }
            };
            this.setState({editForm: updateControls});
        }
    };

    /**
     * アカウント削除処理
     * 削除したあとはlogin画面に飛ばす
     */
    deleteHandler(){
        const isDelete = confirm('本当に削除してよろしいですか？');
        if(isDelete) {
            axios.delete(`/auth`, {
                headers: this.props.auth.headers
            });
            AuthDispatcher.logout();
        }
    }

    /**
     * ログインしているが本人ではないユーザーの場合はリダイレクト
     */
    componentDidMount() {
        if(this.props.auth.currentUser.id != this.props.match.params.id) {
            this.props.history.replace('/');
        }
    }


    render(){
        const formElementsArray = [];
        for (let key in this.state.editForm) {
            if (isProperty(key)) {
                formElementsArray.push({
                    id: key,
                    config: this.state.editForm[key]
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

        return (
            <>
                <div className={classes.EditForm}>
                    <input style={{marginBottom: '20px'}} type={'file'} onChange={this.props.imageHandler} />
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button click={() => {}} buttonType={button.Edit}>更新</Button>
                    </form>
                    <Button click={() => this.deleteHandler()} buttonType={button.Delete}>アカウント削除</Button>
                </div>
            </>
        );
    }

}

export default editForm;
