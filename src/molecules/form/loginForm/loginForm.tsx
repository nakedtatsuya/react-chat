import React from 'react';
import Button from "../../../atoms/button/Button/Button";
const classes = require('./loginForm.css');
const button = require('../../../atoms/button/Button/Button.css');

const loginForm = () => {

    return (
        <form className={classes.LoginForm}>
            <input type="hidden" name="authenticity_token" value="HyJapbQ8Ov7lUoIseqwj86i2E5huAPv0L2UZHJJ2btC3bbaX8aN2x93FI28zUDfEN9u/+8NzUV7d1JCgxDOkPw==">
            <h2 class="login_title">Chatにログイン</h2>
            <div class="form-group">
                <input class="form-control" placeholder="メールアドレス" autofocus="autofocus" type="email" value="" name="user[email]" id="user_email">
            </div>
            <div class="form-group">
                <input class="form-control" placeholder="パスワード" autocomplete="off" type="password" name="user[password]" id="user_password">
            </div>
            <div class="form-group">
                <input name="user[remember_me]" type="hidden" value="0"><input type="checkbox" value="1" name="user[remember_me]" id="user_remember_me">
                    <label for="user_ログインしたままにする">ログインしたままにする</label>
            </div>
            <div class="form-group actions">
                <input type="submit" name="commit" value="ログイン" class="btn btn-info login_btn">
            </div>
            <a href="/users/sign_up">新規登録の方はこちら</a><br>
            <a href="/users/password/new">パスワードを忘れた場合</a><br>
        </form>
    );
};

export default loginForm;
