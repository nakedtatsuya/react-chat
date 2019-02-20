import React, { Component } from 'react';
import MyPageLink from '../../atoms/myPageLink/myPageLink';
import SearchLink from '../../atoms/searchLink/searchLink';
import UserModal from '../userModal/userModal';
const classes = require('./headerRight.css');

interface State {}
class headerRight extends Component {

    state = {
      isModalShow: false
    };


    userModalHandler = () => {
        this.setState({isModalShow: !this.state.isModalShow});
        console.log(this.state.isModalShow);
    };

    render(){
        return (
            <div className={classes.HeaderRight}>
                <ul className={classes.HeaderRightListUl}>
                    <li className={classes.HeaderRightListLi}><SearchLink /></li>
                    <li className={classes.HeaderRightListLi}>
                        <MyPageLink click={this.userModalHandler} show={this.state.isModalShow} />
                        <UserModal show={this.state.isModalShow} />
                    </li>
                    <div style={{clear: 'both'}}></div>
                </ul>
                <div style={{clear: 'both'}}></div>
            </div>
        );
    }
}

export default headerRight;
