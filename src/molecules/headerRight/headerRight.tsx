import React, { Component } from 'react';
import MyPageLink from '../../atoms/myPageLink/myPageLink';
import SearchLink from '../../atoms/searchLink/searchLink';
import UserModal from '../userModal/userModal';
const classes = require('./headerRight.css');
import AuthAction from '../../modules/auth/authAction';

interface State {}
class headerRight extends Component<any, any> {

    state = {
      isModalShow: false
    };


    userModalHandler = () => {
        this.setState({isModalShow: !this.state.isModalShow});

    };

    render(){
        return (
            <div className={classes.HeaderRight}>
                <ul className={classes.HeaderRightListUl}>
                    <li className={classes.HeaderRightListLi}><SearchLink /></li>
                    <li className={classes.HeaderRightListLi}>
                        <MyPageLink name={this.props.name} click={this.userModalHandler} show={this.state.isModalShow} />
                        <UserModal click={AuthAction.logout} show={this.state.isModalShow} id={this.props.uid} />
                    </li>
                    <div style={{clear: 'both'}}></div>
                </ul>
                <div style={{clear: 'both'}}></div>
            </div>
        );
    }
}

export default headerRight;
