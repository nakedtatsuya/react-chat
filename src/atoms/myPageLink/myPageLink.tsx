import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretSquareDown} from '@fortawesome/free-regular-svg-icons';
const classes = require('./myPageLink.css');

/**
 * マイページへのリンク
 * @param {{click: () => void; show: boolean; name: string}} props
 * @returns {any}
 */
const myPageLink = (props: {click: () => void, show: boolean, name: string}) => {
    const cancel = props.show ? <div className={classes.Cancel}></div> : null;
    return (
        <div className={classes.MyPageLink} onClick={props.click} >
            {props.name}<FontAwesomeIcon icon={faCaretSquareDown}/>
            {cancel}
        </div>
    );
};

export default myPageLink;
