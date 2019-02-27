import React, { PureComponent } from 'react';
import HeaderLeft from '../../molecules/headerLeft/headerLeft';
import HeaderRight from '../../molecules/headerRight/headerRight';
const { withRouter } = require('react-router-dom');

const classes = require('./header.css');

/**
 * ヘッダー
 * @param props
 * @returns {any}
 * @constructor
 */
class Header extends PureComponent<any>{

    render(){
        const {name, email, id} = this.props.auth.currentUser;

        return (
            <header className={classes.Header}>
                <HeaderLeft />
                <HeaderRight
                    name={name}
                    email={email}
                    uid={id}
                />
            </header>
        );
    }
}

export default withRouter(Header);
