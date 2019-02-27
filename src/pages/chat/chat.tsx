import React, { Component } from 'react';
import UserList from '../../organisms/userList/userList';
import MessageBox from '../../organisms/messageBox/messageBox';
import Header from '../../organisms/header/header';
import FriendDispatcher from "../../modules/friend/friendAction";
const { withRouter } = require('react-router-dom');

/**
 * chat画面コンテナー
 * chat情報とfriend情報はflux管理
 */
class Chat extends Component<any, any> {

    state: any = {
        value: '',
    };

    /**
     * 友達削除アクション
     * @param {number} id
     */
    deleteFriendHandler= (id: number) => {
        const isDelete = confirm('友達削除しますか？(トーク履歴は残ります)');
        if(isDelete) {
            FriendDispatcher.deleteFriend(id);
        }
    };

    /**
     * 画像送信アクション
     * @param event
     */
    sendImageHandler = (event: any) => {
        const params = new FormData();
        const fileSelectDom = event.target.files[0];
        params.append('image', fileSelectDom);
        FriendDispatcher.postImageMessage(params);
    };

    /**
     * メッセージ送信アクション
     * @param event
     */
    sendMessageHandler = (event: any) => {
        event.preventDefault();
        //空文字送信バリデーション
        if(this.state.value === null || this.state.value === '') {
            return;
        }
        FriendDispatcher.postMessage(this.state.value);
        //送信後はinputをリセット
        this.setState({value: ''});
    };

    /**
     * 入力されるたびにvalue更新
     * @param event
     */
    changeMessageHandler = (event: any) => {
      this.setState({value: event.target.value});
    };

    /**
     * 初回ロード時は友達リスト取得
     * リストの先頭をアクティブユーザーとして表示
     */
    componentDidMount() {
        FriendDispatcher.friendList();
    }

    /**
     * 友達リストとチャットリストでコンポーネント分け
     * @returns {any}
     */
    render() {
        return (
            <>
                <Header {...this.props} />
                <div>
                    <UserList activeUser={this.props.friend.activeUserId} userList={this.props.friend.friendList} click={this.deleteFriendHandler} />
                    <MessageBox
                        value={this.state.value}
                        inputHandler={this.changeMessageHandler}
                        formHandler={this.sendMessageHandler}
                        sendId={this.props.friend.activeUserId}
                        chatList={this.props.friend.chatList}
                        currentId={this.props.auth.currentUser.id}
                        imageHandler={this.sendImageHandler}
                    />
                </div>
            </>
        )
    }
}

export default withRouter(Chat);
