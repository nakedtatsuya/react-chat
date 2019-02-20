import React, { Component} from 'react';
const {withRouter} = require('react-router-dom');

import EditForm from '../../molecules/form/editForm/editForm';

const classes = require('./userProfileEdit.css');

class userProfileEdit extends Component {

    render() {
        return (
            <div className={classes.EditWrapper}>
                <h3 className={classes.Title}>プロフィール編集</h3>
                <EditForm />
            </div>
        );
    }
}

export default withRouter(userProfileEdit);
