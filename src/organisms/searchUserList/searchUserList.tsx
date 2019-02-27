import React from 'react';
const classes = require('./searchUserList.css');
import UserImage from '../../atoms/userImage/userImage';
const image = require('../../atoms/userImage/userImage.css');

/**
 * 検索結果のユーザーリスト
 * @param {{currentUser: any; userList: any; click: (id: number) => void}} props
 * @returns {any}
 */
const searchUserList = (props: {currentUser: any,userList: any, click: (id: number) => void}) => {

    //ユーザーごとのリストアイテムを作成して返す
    const users = props.userList.map((user: any) => {
        return (
            <li key={user.id} className={classes.SearchUserListItem}>
                <div className={classes.SearchUserListResult} onClick={() => props.click(user.id)}>
                    <UserImage imageURL={user.image.url} imageClass={image.UserImage} />
                    <span>{user.name}</span>
                    <div style={{clear: 'both'}}></div>
                </div>
            </li>
        );
    });

    return (
        <ul className={classes.SearchUserList}>
            {users}
        </ul>
    );
};

export default searchUserList;
