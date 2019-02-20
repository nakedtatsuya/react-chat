import React, { Component } from 'react';
const classes = require('./login.css');


class Login extends Component {
    render() {
        return (
            <div className={classes.LoginWrapper}>
                <div className={classes.FormWrapper}>
                    <form className={classes.NewUser} id="new_user" action="/users/sign_in" accept-charset="UTF-8" method="post">
                        <input name="utf8" type="hidden" value="✓">
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
                </div>
                <div class="image_wrapper">
                    <img src="/src/assets/images/topimage.png" alt="Registrations view">
                </div>
            </div>
        );
    }
}

export default Login;
