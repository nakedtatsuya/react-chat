import React from 'react';
import classes from './Spinner.css';

/**
	* ローディング画面
	* @returns {*}
	*/
const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;