import React from 'react';
import HeaderLeft from '../../molecules/headerLeft/headerLeft';
import HeaderRight from '../../molecules/headerRight/headerRight';

const classes = require('./header.css');

class Header extends React.Component {
		render() {
				return (
						<header className={classes.Header}>
                            <HeaderLeft />
                            <HeaderRight />
						</header>
		)
		}
}

export default Header;
