import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretSquareDown} from '@fortawesome/free-regular-svg-icons';
const classes = require('./myPageLink.css');

const myPageLink = (props: {click: () => void, show: boolean}) => {

    const cancel = props.show ? <div className={classes.Cancel}></div> : null;

    return (
        <div className={classes.MyPageLink} onClick={props.click} >
             (tatsuya)<FontAwesomeIcon icon={faCaretSquareDown}/>
            {cancel}
        </div>
    );
};

export default myPageLink;
