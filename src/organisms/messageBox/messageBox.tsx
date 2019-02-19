import React, { Component } from 'react';
const classes = require('./messageBox.css');


class MessageBox extends Component {
    render() {
        return (
            <div class="message-box" data-reactid=".0.1">
                <ul class="message-box__list" data-reactid=".0.1.0">
                    <li class="message-box__item message-box__item--from-current clear" data-reactid=".0.1.0.$865">
                        <div class="message-box__item__contents" data-reactid=".0.1.0.$865.0">
                            dd
                        </div>
                    </li>
                </ul>
                <div class="reply-box" data-reactid=".0.1.1">
                    <input value="" class="reply-box__input" placeholder="Type message to reply.." data-reactid=".0.1.1.0">
                        <div class="reply-box__image" data-reactid=".0.1.1.1">
                            <input class="image-select-btn" type="file" data-reactid=".0.1.1.1.0">
                        </div>
                        <span class="reply-box__tip" data-reactid=".0.1.1.2">
                            <span data-reactid=".0.1.1.2.0">Press </span>
                            <span class="reply-box__tip__button" data-reactid=".0.1.1.2.1">Enter</span>
                            <span data-reactid=".0.1.1.2.2"> to send</span>
                        </span>
                </div>
            </div>
        )
    }
}

export default MessageBox;
