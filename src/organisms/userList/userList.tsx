import React from 'react';
import UserListItem from '../../molecules/userListItem/userListItem';
const classes = require('./userList.css');

/**
 * 友達リスト
 * @param {{change: any; userList: any; click: any; activeUser: number}} props
 * @returns {any}
 * @constructor
 */
const UserList = (props: {userList: any, click: any, activeUser: number}) => {

    const users = props.userList.map((user: any) => {
        //画像設定があるかチェック
        let imageURL = null;
        if(user.image !== null){
            imageURL = user.image.url;
        }

        return (
            <UserListItem
                activeUser={props.activeUser}
                click={props.click}
                key={user.id}
                name={user.name}
                id={user.id}
                isRead={user.isRead}
                image={imageURL}
            />
        );
    });

    return (
        <div className={classes.UserList}>
            <ul className={classes.UserListUl}>
                {users}
            </ul>
        </div>
    );
};

export default UserList;
