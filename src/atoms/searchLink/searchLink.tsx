import React from 'react';
const classes = require('./searchLink.css');
const { Link } = require('react-router-dom');


const searchLink = () => {
    return (
      <Link className={classes.SearchLink} to={"/search"}>ユーザーを探す</Link>
    )
};

export default searchLink;
