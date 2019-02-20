import React, { Component } from 'react';
import Button from "../../../atoms/button/Button/Button";
const classes = require('./signupForm.css');
const button = require('../../../atoms/button/Button/Button.css');
const { Link } = require('react-router-dom');
import HomeImage from '../../../atoms/homeImage/homeImage';

class SignupForm extends Component {
    render() {
        return (
            <div className={classes.LoginWrapper}>
                <div className={classes.FormWrapper}>
                    <form className={classes.LoginForm}>
                        <h2 className={classes.Title}>Chatを始めよう</h2>
                        <div className={classes.FormGroup}>
                            <input className={classes.FormControl} placeholder="ユーザー名" type="text" name="user[name]" id="user_name"/>
                        </div>
                        <div className={classes.FormGroup}>
                            <input className={classes.FormControl} placeholder="メールアドレス" type="email" name="user[email]" id="user_email"/>
                        </div>
                        <div className={classes.FormGroup}>
                            <input className={classes.FormControl} placeholder="パスワード" type="password" name="user[password]" id="user_password"/>
                        </div>
                        <div className={classes.FormGroup}>
                            <input className={classes.FormControl} placeholder="パスワード確認" type="password_confirmation" name="user[password_confirmation]" id="user_password_confirmation"/>
                        </div>
                        <Button click={() => console.log('')} buttonType={button.Login}>新規登録</Button>
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

export default SignupForm;
