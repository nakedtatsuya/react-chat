import React from 'react';
const classes = require('./userListItem.css');
const image = require('../../atoms/userImage/userImage.css');

import RemoveButton from '../../atoms/button/removeButton/removeButton';
import UserImage from '../../atoms/userImage/userImage';
import UserDetail from '../../atoms/userDetail/userDetail';


const userListItem = (props: {change: any, activeUser: any, name: string, id: number, click: () => void}) => {
    let listClass = classes.UserListItemClear;
    if(props.activeUser == props.id) {
        listClass = classes.UserListItemActive;
    }
    return (
        <li onClick={() => props.change(props.id)} key={props.id} className={listClass}>
            <RemoveButton id={props.id} click={props.click} />
            <UserImage imageURL={'#'} imageClass={image.UserImage} />
            <UserDetail name={props.name} id={props.id} />
            <div style={{clear: 'both'}}></div>
        </li>
    );
};

export default userListItem;
