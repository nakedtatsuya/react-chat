import React, { Component } from 'react';
import UserProfile from '../../organisms/userProfile/userProfile';
import UserProfileEdit from '../../organisms/userProfileEdit/userProfileEdit';
const { Route, Switch } = require('react-router-dom');
import Header from '../../organisms/header/header';
import FluxContainer from "../../fluxContainer";
const { Link, withRouter } = require('react-router-dom');


class User extends Component<any, any> {

    render() {
        return (
            <>
                <Header />
                <Switch>
                    <Route path='/users/edit/:id' exact render={(match: any) => (
                        <UserProfileEdit match={match} {...this.props} />
                    )} />
                    <Route path='/users/:id' exact render={(match: any) => (
                        <UserProfile match={match} {...this.props} />
                    )} />
                </Switch>
            </>
        );
    }
}

export default withRouter(User);
