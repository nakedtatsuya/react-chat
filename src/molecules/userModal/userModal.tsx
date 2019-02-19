import React from 'react';
const classes = require('./userModal.css');


const userModal = () => {
	return (
		<ul className={classes.UserModal} role="menu">
				<li className="user-menu-list" role="presentation"><a href={'#'}>マイページ</a></li>
				<li className="user-menu-list" role="presentation"><a rel="nofollow" href="#">ログアウト</a></li>
		</ul>
	);
};

export default userModal;
