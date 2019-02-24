import React, { Component } from 'react';
import HeaderLeft from '../../molecules/headerLeft/headerLeft';
import HeaderRight from '../../molecules/headerRight/headerRight';
import FluxContainer from "../../fluxContainer";
import AuthAction from "../../modules/auth/authAction";
const { withRouter } = require('react-router-dom');

const classes = require('./header.css');

const Header = (props: any) => {

    const user = FluxContainer.calculateState().auth.currentUser;


    return (
        <header className={classes.Header}>
            <HeaderLeft />
            <HeaderRight
                name={user.name}
                email={user.email}
                uid={user.id}
            />
        </header>
    );
};

export default withRouter(Header);
