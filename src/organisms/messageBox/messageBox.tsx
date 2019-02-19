import React, { Component } from 'react';
const classes = require('./messageBox.css');
import ReplyBox from '../../molecules/replyBox/replyBox';

class MessageBox extends Component {
    render() {
        return (
            <div className={classes.MessageBox}>
                <ul className={classes.MessageBoxList}>
                    <li className={classes.MessageBoxItem}>
                        <div className={classes.MessageBoxItemContent}>
                            dd
                        </div>
                    </li>
                </ul>
                <ReplyBox />
            </div>
        )
    }
}

export default MessageBox;
