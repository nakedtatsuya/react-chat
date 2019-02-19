import React from 'react';
import Logo from '../../atoms/logo/logo';
const classes = require('./headerLeft.css');


const headerLeft = () => {
    return (
        <div className={classes.HeaderLeft}>
            <Logo />
        </div>
    )
};

export default headerLeft;
