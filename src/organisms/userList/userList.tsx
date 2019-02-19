import React, { Component } from 'react';
import UserListItem from '../../molecules/userListItem/userListItem';
const classes = require('./userList.css');


class UserList extends Component {
    render() {
        return (
            <div className={classes.UserList}>
                <ul className={classes.UserListUl}>
                    <UserListItem url={'#'} />
                </ul>
            </div>
        )
    }
}

export default UserList;
