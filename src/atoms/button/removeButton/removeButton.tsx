import React from 'react';
const classes = require('./removeButton.css');

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';

const removeButton = (props: any) => {
    return (
        <button onClick={() => props.click(props.id)} className={classes.RemoveButton}>
            <FontAwesomeIcon icon={faTimesCircle} />
        </button>
    );
};

export default removeButton;
