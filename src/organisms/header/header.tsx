import React from 'react';
import HeaderLeft from '../../molecules/headerLeft/headerLeft';
import HeaderRight from '../../molecules/headerRight/headerRight';

class Header extends React.Component {
		render() {
				return (
						<header className='header'>
                            <HeaderLeft />
                            <HeaderRight />
						</header>
		)
		}
}

export default Header;
