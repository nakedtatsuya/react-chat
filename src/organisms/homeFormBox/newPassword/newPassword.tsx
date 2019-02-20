import React, { Component } from 'react';
import Button from "../../../atoms/button/Button/Button";
const classes = require('./newPassword.css');
const button = require('../../../atoms/button/Button/Button.css');
const { Link } = require('react-router-dom');

class newPassword extends Component {
    render() {
        return (
            <div className={classes.FormWrapper}>
                <h2 className={classes.Title}>パスワードをリセット</h2>
                <p>ご登録いただいたメールアドレスを入力してください。</p>
                <p>メールアドレス宛にパスワード変更ページのURLが記載されたメールを送信します。</p>
                <form className={classes.LoginForm}>
                    <div className={classes.FormGroup}>
                        <input className={classes.FormControl} placeholder="メールアドレス" type="email" name="user[email]" id="user_email"/>
                    </div>
                    <Button click={() => console.log('')} buttonType={button.NewPassword}>パスワードをリセット</Button>
                    <div className={classes.LinkContainer}>
                        <Link to={'/home/login'}>ログインはこちら</Link>
                        <Link to={'/home/login'}>新規登録の方はこちら</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default newPassword;
