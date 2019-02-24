import React from 'react';
const classes = require('./userModal.css');
const { Link } = require('react-router-dom');

const userModal = (props: {show: boolean, id: number, click: () => void}) => {
    const modal = props.show ? (
        <ul className={classes.UserModal}>
            <li><Link to={`/users/${props.id}`} rel="nofollow">マイページ</Link></li>
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
