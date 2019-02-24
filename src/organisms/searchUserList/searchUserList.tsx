import React from 'react';
const classes = require('./searchUserList.css');
import UserImage from '../../atoms/userImage/userImage';
const image = require('../../atoms/userImage/userImage.css');

const searchUserList = (props: {currentUserId: number,userList: any, click: (id: number) => void}) => {

    const users = props.userList.map((user: any) => {
        return (
            <li key={user.id} className={classes.SearchUserListItem}>
                <div className={classes.SearchUserListResult} onClick={() => props.click(user.id)}>
                    <UserImage imageURL={''} imageClass={image.UserImage} />
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
