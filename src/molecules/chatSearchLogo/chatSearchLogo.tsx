import React from 'react';
const classes = require('./chatSearchLogo.css');

//Googleチックなロゴ
const chatSearchLogo = () => {

    return (
        <div className={classes.ChatSearchLogo}>
            <span className={classes.LogoC}>C</span>
            <span className={classes.LogoH}>h</span>
            <span className={classes.LogoA}>a</span>
            <span className={classes.LogoT}>t</span>
            <span className={classes.LogoA2}>A</span>
            <span className={classes.LogoP}>p</span>
            <span className={classes.LogoP2}>p</span>
        </div>
    );
};

export default chatSearchLogo;