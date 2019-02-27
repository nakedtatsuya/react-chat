import React, { PureComponent } from 'react';
const classes = require('./userListItem.css');
const image = require('../../atoms/userImage/userImage.css');

import RemoveButton from '../../atoms/button/removeButton/removeButton';
import UserImage from '../../atoms/userImage/userImage';
import UserDetail from '../../atoms/userDetail/userDetail';
import FriendDispatcher from "../../modules/friend/friendAction";

/**
 * 友達リストアイテムのコンポーネント
 */
class userListItem extends PureComponent<any, any>{

    //既読ステータスはここで保持
    state = {
        isRead: this.props.isRead
    };

    /**
     * chat相手の変更時のアクション
     * 変更したユーザーのIDからchat取得
     * @param {number} id
     */
    changeChatList = (id: number) => {
        FriendDispatcher.chatList(id);
        this.setState({isRead: 1});
    };

    render(){
        //アクティブユーザーにはクラス付与
        let listClass = classes.UserListItemClear;
        if(this.props.activeUser == this.props.id) {
            listClass = classes.UserListItemActive;
        }
        return (
            <li onClick={() => this.changeChatList(this.props.id)} key={this.props.id} className={listClass}>
                <RemoveButton id={this.props.id} click={this.props.click} />
                <UserImage imageURL={this.props.image} imageClass={image.UserImage} />
                <UserDetail isRead={this.state.isRead} name={this.props.name} id={this.props.id} />
                <div style={{clear: 'both'}}></div>
            </li>
        );
    }
}

export default userListItem;
