import React, { Component} from 'react';
const {withRouter} = require('react-router-dom');

import EditForm from '../FormBox/editForm/editForm';

const classes = require('./userProfileEdit.css');

/**
 * edit画面コンテナー
 * @param props
 * @returns {any}
 */
const userProfileEdit = (props: any) => {
    return (
        <div className={classes.EditWrapper}>
            <h3 className={classes.Title}>プロフィール編集</h3>
            <EditForm {...props} />
        </div>
    );
};

export default withRouter(userProfileEdit);
