import React from 'react';
import Button from "../../../atoms/button/Button/Button";
const classes = require('./editForm.css');
const button = require('../../../atoms/button/Button/Button.css');

const editForm = () => {

    return (
        <>
            <div className={classes.EditForm}>
                <form >
                    <div className={classes.FormGroup}>
                        <input type="file" name="user[image]" id="user_image" />
                    </div>
                    <div className={classes.EditFormGroup}>
                        <input className={classes.FormControl} type="text" value="tatsuya" name="user[name]" id="user_name" />
                    </div>
                    <div className={classes.EditFormGroup}>
                        <input className={classes.FormControl} type="email" value="nakedtatsuya@gmail.com" name="user[email]" id="user_email" />
                    </div>
                    <div className={classes.EditFormGroup}>
                        <input className={classes.FormControl} placeholder="現在のパスワード(更新する場合はこの項目を必ず入力してください。)" type="password" name="user[current_password]" id="user_current_password" />
                    </div>
                    <div className={classes.EditFormGroup}>
                        <input className={classes.FormControl} placeholder="新しいパスワード" type="password" name="user[password]" id="user_password" />
                    </div>
                    <div className={classes.EditFormGroup}>
                        <input className={classes.FormControl} placeholder="新しいパスワードの確認" type="password" name="user[password_confirmation]" id="user_password_confirmation" />
                    </div>
                    <Button click={() => console.log('formsend')} buttonType={button.Edit}>更新</Button>
                </form>
                <Button click={() => console.log('formsend')} buttonType={button.Delete}>アカウント削除</Button>
            </div>
        </>
    );
};

export default editForm;
