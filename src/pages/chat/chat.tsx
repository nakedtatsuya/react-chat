import React, { Component } from 'react';
import UserList from '../../organisms/userList/userList';
import MessageBox from '../../organisms/messageBox/messageBox';
import Header from '../../organisms/header/header';

class Chat extends Component {
    render() {
        return (
            <>
                <Header />
                <div>
                    <UserList  />
                    <MessageBox />
                </div>
            </>
        )
    }
}

export default Chat;
