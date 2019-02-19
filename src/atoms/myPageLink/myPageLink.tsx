import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretSquareDown} from '@fortawesome/free-regular-svg-icons';
const classes = require('./myPageLink.css');

const myPageLink = ({name: string}: any) => {
    return (
        <div className={classes.MyPageLink}>
             (tatsuya)<FontAwesomeIcon icon={faCaretSquareDown}/>
        </div>
    );
};

export default myPageLink;
