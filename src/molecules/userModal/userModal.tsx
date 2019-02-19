import React from 'react';

const userModal = () => {
	return (
		<ul className="dropdown-menu user-menu-box" role="menu">
				<li className="user-menu-list" role="presentation"><a href={'#'}>マイページ</a></li>
				<li className="user-menu-list" role="presentation"><a rel="nofollow" href="#">ログアウト</a></li>
		</ul>
	);
};

export default userModal;
