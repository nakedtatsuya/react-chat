import React from 'react';
const classes = require('./replyBox.css');

/**
 * メッセージ送信フォーム
 * @param props
 * @returns {any}
 */
const replyBox = (props: any) => {
    return (
        <div className={classes.ReplyBox}>
            <form encType="multipart/form-data" id={'form'} onSubmit={props.formHandler}>
                <input value={props.value} onChange={props.inputHandler} className={classes.ReplyInput} placeholder="Type message to reply.." />
                <div className={classes.ImageInput}>
                    <input
                        accept="image/png,image/jpeg"
                        onChange={props.imageHandler}
                        type="file"
                    />
                </div>
            </form>
        </div>
    );
};

export default replyBox;
