import React, { Component } from 'react';

class Signup extends Component {
    render() {
        return (
            <div class="sign_up_wrapper">
                <div class="form_wrapper">
                    <form class="new_user" id="new_user" action="/users" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="eGpKbjC5urGmhkkekJxSx9HH9BDa7CdWBR+ahQZBD4LQJaZcdSb2iJ4R6F3ZYEbwTqpYc3efjfz3rhM5UATFbQ==">
                        <h2 class="new_user_title">Chatを始めよう</h2>
                        <div class="form-group">
                            <input class="form-control" placeholder="ユーザー名" type="text" name="user[name]" id="user_name">
                        </div>
                        <div class="form-group">
                            <input class="form-control" placeholder="メールアドレス" autofocus="autofocus" type="email" value="" name="user[email]" id="user_email">
                        </div>
                        <div class="form-group">
                            <input class="form-control" placeholder="パスワード" autocomplete="off" type="password" name="user[password]" id="user_password">
                        </div>
                        <div class="form-group">
                            <input class="form-control" placeholder="パスワード確認" autocomplete="off" type="password" name="user[password_confirmation]" id="user_password_confirmation">
                        </div>
                        <div class="form-group">
                            <input type="submit" name="commit" value="新規登録" class="btn btn-info new_user_btn">
                        </div>
                        <a href="/users/sign_in">ログインはこちらから</a>
                    </form>
                </div>
                <div class="image_wrapper">
                    <img src="/assets/registrations_view-6909b817290cc9ee9fd66b876dbc458a3cad8dff379e6596c4b2d9443dbb1b95.png" alt="Registrations view">
                </div>
            </div>
        );
    }
}

export default Signup;
