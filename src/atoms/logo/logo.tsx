import React from 'react';
const {Link} = require('react-router-dom');
const classes = require('./logo.css');

/**
 * ロゴ
 * @returns {any}
 * @constructor
 */
const Logo = () => {
    return (
        <div className={classes.Logo}>
            <Link to={'/'} >ChatApp</Link>
        </div>
    )
};

export default Logo;
