import React from 'react';
const classes = require('./userModal.css');
const { Link } = require('react-router-dom');

const userModal = (props: {show: boolean}) => {
    const modal = props.show ? (
        <ul className={classes.UserModal}>
            <li><Link to={'/users/1'} rel="nofollow">マイページ</Link></li>
            <li><Link to={'/logout'} rel="nofollow">ログアウト</Link></li>
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
