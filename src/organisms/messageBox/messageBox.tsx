import React, { Component } from 'react';
const classes = require('./messageBox.css');
import ReplyBox from '../../molecules/replyBox/replyBox';

/**
 *
 * @param props
 * @returns {any}
 * @constructor
 */
const MessageBox = (props: any) => {

    let messageClass;

    const chatList = props.chatList.map((chat: any, key: number) => {
        //チャットレイアウト
        if(chat.from_id === props.currentId) {
            messageClass = [classes.MessageBoxItemContent,classes.FloatRight];
        }else {
            messageClass = [classes.MessageBoxItemContent,classes.FloatLeft];
        }
        //画像ならimgタグを返す
        if(chat.image.url !== null) {
            return (
                <li key={chat.id} className={classes.MessageBoxLi}>
                    <div className={messageClass.join(' ')}>
                        <img style={{width: '100%', height: 'auto'}} src={chat.image.url} />
                    </div>
                    <div style={{clear: 'both'}}></div>
                </li>
            )
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

    //チャットリストとメッセージ入力フォーム
    return (
        <div className={classes.MessageBox}>
            <ul className={classes.MessageBoxUl}>
                {chatList}
            </ul>

            <ReplyBox
                imageSrc={props.imageSrc}
                imageHandler={props.imageHandler}
                value={props.value}
                inputHandler={props.inputHandler}
                formHandler={props.formHandler}
                sendId={props.sendId}
            />
        </div>
    )
};

export default MessageBox;
