import React from 'react';
const classes = require('./userDetail.css');
const { Link } = require('react-router-dom');
import FriendDispatcher from '../../modules/friend/friendAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons';

/**
 * ユーザーネーム
 * @param {{isRead: any; name: string; id: number}} props
 * @returns {any}
 */
const userDetail = (props: {isRead: any, name: string, id: number}) => {
    //未読メッセージがある場合は通知アイコン表示
    let notReadFlag = null;

    if(props.isRead === 0) {
        notReadFlag = <FontAwesomeIcon icon={faBell} style={{marginRight: '4px'}} />;
    }

    return (
        <div className={classes.UserDetail} >
            <div className={classes.UserNameBox} >
                <Link onClick={() => FriendDispatcher.show(props.id)} to={`/users/${props.id}`} className={classes.UserName}>
                    {notReadFlag}{props.name}
                </Link>
            </div>
        </div>
    );
};

export default userDetail;
