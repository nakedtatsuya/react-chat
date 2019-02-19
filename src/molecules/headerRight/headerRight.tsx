import React from 'react';
import MyPageLink from '../../atoms/myPageLink/myPageLink';
import SearchLink from '../../atoms/searchLink/searchLink';
import UserModal from '../userModal/userModal';

const headerRight = () => {
    return (
        <div>
            <ul>
                <li><SearchLink /></li>
                <li>
                    <MyPageLink />
                    <UserModal />
                </li>
            </ul>
        </div>
    )
};

export default headerRight;
