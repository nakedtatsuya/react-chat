import React from 'react';
import Button from "../../../atoms/button/Button/Button";
const classes = require('./loginForm.css');
const button = require('../../../atoms/button/Button/Button.css');
const { Link } = require('react-router-dom');
import HomeImage from '../../../atoms/homeImage/homeImage';


const loginForm = () => {

    return (
        <div className={classes.LoginWrapper}>
            <div className={classes.FormWrapper}>
                <form className={classes.LoginForm}>
                    <h2 className={classes.Title}>Chatにログイン</h2>
                    <div className={classes.FormGroup}>
                        <input className={classes.FormControl} placeholder="メールアドレス" type="email" name="user[email]" id="user_email"/>
                    </div>
                    <div className={classes.FormGroup}>
                        <input className={classes.FormControl} placeholder="パスワード" type="password" name="user[password]" id="user_password"/>
                    </div>
                    <div className={[classes.FormGroup, classes.Label].join(' ')}>
                        <label>
                        <input type="checkbox" value="1" name="user[remember_me]" id="remember_me" />
                        ログインしたままにする</label>
                    </div>
                    <Button click={() => console.log('')} buttonType={button.Login}>ログイン</Button>
                    <div className={classes.LinkContainer}>
                        <Link to={'/home/sign_up'}>新規登録の方はこちら</Link>
                        <Link to={'/home/password/new'}>パスワードを忘れた場合</Link>
                    </div>
                </form>
            </div>
            <HomeImage />
        </div>
    );
};

export default loginForm;
