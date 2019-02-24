import React from 'react';
const classes = require('./replyBox.css');

const replyBox = (props: any) => {
    return (
        <div className={classes.ReplyBox}>
            <form onSubmit={props.formHandler}>
                <input value={props.value} onChange={props.inputHandler} className={classes.ReplyInput} placeholder="Type message to reply.." />
                <div className={classes.ImageInput}>
                    <input type="file" />
                </div>
            </form>
        </div>
    );
};

export default replyBox;
