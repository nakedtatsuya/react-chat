import React, { Component } from 'react';
import UserProfile from '../../organisms/userProfile/userProfile';
import UserProfileEdit from '../../organisms/userProfileEdit/userProfileEdit';
const { Route, Switch } = require('react-router-dom');
import Header from '../../organisms/header/header';


class User extends Component {

    render() {
        return (
            <>
                <Header />
                <Switch>
                    <Route path="/users/:id" exact component={UserProfile} />
                    <Route path="/users/edit/:id" exact component={UserProfileEdit} />
                </Switch>
            </>
        );
    }
}

export default User;
