import React from 'react';
import FriendDispatcher from "../../modules/friend/friendAction";
const classes = require('./userModal.css');
const { Link } = require('react-router-dom');

/**
 * マイページとログアウトリンクのモーダル
 * @param {{show: boolean; id: number; click: () => void}} props
 * @returns {any}
 */
const userModal = (props: {show: boolean, id: number, click: () => void}) => {
    const modal = props.show ? (
        <ul className={classes.UserModal}>
            <li><Link onClick={() => FriendDispatcher.show(props.id)} to={`/users/${props.id}`} rel="nofollow">マイページ</Link></li>
            <li><button onClick={props.click}>ログアウト</button></li>
            <div style={{clear: 'both'}}></div>
        </ul>
    ) : null;

	return (
	    <>
            {modal}
        </>
	);
};

export default userModal;
