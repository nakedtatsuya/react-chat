import React from 'react';
const classes = require('./searchUserList.css');
import UserImage from '../../atoms/userImage/userImage';
const image = require('../../atoms/userImage/userImage.css');

const searchUserList = (props: {name: string, imageURL: string}) => {
    return (
        <ul className={classes.SearchUserList}>
            <li className={classes.SearchUserListItem}>
                <div className={classes.SearchUserListResult}>
                    <UserImage imageURL={''} imageClass={image.UserImage} />
                    <span>(name)</span>
                    <div style={{clear: 'both'}}></div>
                </div>
            </li>
        </ul>
    );
};

export default searchUserList;
