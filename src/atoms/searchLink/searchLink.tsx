import React from 'react';
const classes = require('./searchLink.css');

const searchLink = () => {
    return (
        <a className={classes.SearchLink} href={'#'}>
            ユーザーを探す
        </a>
    )
};

export default searchLink;
