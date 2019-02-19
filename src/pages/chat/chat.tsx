import React, { Component } from 'react';
import UserList from '../../organisms/userList/userList';
import MessageBox from '../../organisms/messageBox/messageBox';

class Chat extends Component {
    render() {
        return (
            <div>
                <UserList  />
                <MessageBox />
            </div>
        )
    }
}

export default Chat;
