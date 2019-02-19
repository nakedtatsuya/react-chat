import React from 'react';
import MyPageLink from '../../atoms/myPageLink/myPageLink';
import SearchLink from '../../atoms/searchLink/searchLink';
import UserModal from '../userModal/userModal';
const classes = require('./headerRight.css');

const headerRight = () => {
    return (
        <div className={classes.HeaderRight}>
            <ul className={classes.HeaderRightListUl}>
                <li className={classes.HeaderRightListLi}><SearchLink /></li>
                <li className={classes.HeaderRightListLi}>
                    <MyPageLink />
                    <UserModal />
                </li>
                <div style={{clear: 'both'}}></div>
            </ul>
            <div style={{clear: 'both'}}></div>
        </div>
    )
};

export default headerRight;
