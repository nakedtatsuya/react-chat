import React from 'react';
const classes = require('./replyBox.css');
import ReplyInput from '../../atoms/input/replyInput/replyInput';
import ImageInput from '../../atoms/input/imageInput/imageInput';

const replyBox = () => {
    return (
        <div className={classes.ReplyBox}>
            <ReplyInput />
            <ImageInput />
        </div>
    );
};

export default replyBox;
