import React from 'react';
const classes = require('./replyInput.css');

const replyInput = () => (
    <>
        <input value="" className={classes.ReplyInput} placeholder="Type message to reply.." />
    </>
);

export default replyInput;