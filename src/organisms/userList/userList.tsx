import React from 'react';
import UserListItem from '../../molecules/userListItem/userListItem';
const classes = require('./userList.css');


const UserList = (props: {change: any, userList: any, click: any, activeUser: number}) => {

    const users = props.userList.map((user: any) => {
        return (
            <UserListItem
                activeUser={props.activeUser}
                click={props.click}
                key={user.id}
                name={user.name}
                id={user.id}
                change={props.change}
            />
        );
    });

    return (
        <div className={classes.UserList}>
            <ul className={classes.UserListUl}>
                {users}
            </ul>
        </div>
    )
};

export default UserList;
