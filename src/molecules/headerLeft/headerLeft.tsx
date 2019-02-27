import React from 'react';
import Logo from '../../atoms/logo/logo';
const classes = require('./headerLeft.css');

//ロゴ
const headerLeft = () => {
    return (
        <div className={classes.HeaderLeft}>
            <Logo />
        </div>
    )
};

export default headerLeft;
