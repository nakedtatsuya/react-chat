import React, {Component, FormEvent} from 'react';
import Button from "../../../atoms/button/Button/Button";
const classes = require('./editForm.css');
const button = require('../../../atoms/button/Button/Button.css');
import Input from "../../../atoms/input/Input";
import AuthAction from "../../../modules/auth/authAction";
import axios from '../../../axios-order';


interface editForm {
    name: ControlConfig,
    email: ControlConfig,
    password: ControlConfig,
    password_confirmation: ControlConfig
}
interface State {
    signUpForm: editForm,
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
const isProperty = (value: string): value is (keyof editForm) => {
    return value === 'name' || value === 'email' || value === 'password' || value === 'password_confirmation';
};
class editForm extends Component<any, any> {

    state: any = {
        editForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'ユーザー名',
                    type: 'text',
                    maxLength: "20",
                    required: true,
                    autoFocus: true
                },
                value: this.props.auth.currentUser.name,
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
                value: this.props.auth.currentUser.email,
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
                    placeholder: '新しいパスワード',
                    type: 'password',
                    required: false,
                    maxLength: '16',
                    minLength: '0'
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
                    placeholder: '新しいパスワードの確認',
                    type: 'password',
                    required: false,
                    maxLength: "16",
                    minLength: '0'
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

        const formData : any = {name: '', email: '', password: '', password_confirmation: ''};
        for (let formElementIdentifier in this.state.editForm) {
            if (isProperty(formElementIdentifier)) {
                formData[formElementIdentifier] = this.state.editForm[formElementIdentifier].value;
            }
        }

        const headers = {
            headers: {
                accessToken: this.props.auth.token,
                uid: this.props.auth.uid,
                client: this.props.auth.client
            }
        };

        if(formData.name !== this.props.auth.currentUser.name || formData.email !== this.props.auth.currentUser.email) {
            AuthAction.put(formData.name, formData.email, headers,this.props.history);
        }
        if(formData.password !== null && formData.password !== '') {
            AuthAction.putPassword(formData.password, formData.password_confirmation, headers, this.props.history);
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
                    valid: this.checkValidity(event.target.value, this.state.editForm[controlName].validation)
                }
            };
            this.setState({editForm: updateControls});
        }
    };

    deleteHandler(){
        const isDelete = confirm('本当に削除してよろしいですか？');
        if(isDelete) {
            axios.delete(`/auth`, {
                headers: {
                    accessToken: this.props.auth.token,
                    uid: this.props.auth.uid,
                    client:this.props.auth.client
                }
            });
            AuthAction.logout();
        }
    }

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
