import React, { Component } from 'react';
const classes = require('./messageBox.css');
import ReplyBox from '../../molecules/replyBox/replyBox';

const MessageBox = (props: any) => {

    let messageClass;

    const chatList = props.chatList.map((chat: any) => {

        if((chat.from_id !== props.currentId || chat.to_id !== props.sendId) && (chat.to_id !== props.currentId || chat.from_id !== props.sendId)) {
            return null
        }

        if(chat.from_id === props.currentId) {
            messageClass = [classes.MessageBoxItemContent,classes.FloatRight];
        }else {
            messageClass = [classes.MessageBoxItemContent,classes.FloatLeft];
        }


       return (
           <li key={chat.id} className={classes.MessageBoxLi}>
               <div className={messageClass.join(' ')}>
                   {chat.message}
               </div>
               <div style={{clear: 'both'}}></div>
           </li>
       )
    });

    return (
        <div className={classes.MessageBox}>
            <ul className={classes.MessageBoxUl}>
                {chatList}
            </ul>
            <ReplyBox value={props.value} inputHandler={props.inputHandler} formHandler={props.formHandler} sendId={props.sendId} />
        </div>
    )
};

export default MessageBox;
