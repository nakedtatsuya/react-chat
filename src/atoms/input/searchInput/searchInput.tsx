import React from 'react';
const classes = require('./searchInput.css');

const searchInput = () => {
    return (
        <>
            <input type="text" className={classes.SearchInput} value="" placeholder="ユーザー名で検索しよう" />
        </>
    )
};

export default searchInput;
