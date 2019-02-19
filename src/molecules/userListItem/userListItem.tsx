import React from 'react';
const classes = require('./userListItem.css');
import RemoveButton from '../../atoms/button/removeButton/removeButton';
import UserImage from '../../atoms/userImage/userImage';
import UserDetail from '../../atoms/userDetail/userDetail';


const userListItem = (props: {url: string}) => {
    return (
        <li className={classes.UserListItem}>
            <RemoveButton />
            <UserImage imageURL={'#'} />
            <UserDetail url={props.url} />
            <div style={{clear: 'both'}}></div>
        </li>
    );
};

export default userListItem;
