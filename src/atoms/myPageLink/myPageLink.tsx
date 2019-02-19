import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretSquareDown} from '@fortawesome/free-regular-svg-icons';


const myPageLink = ({name: string}: any) => {
    return (
        <div>
             (tatsuya)<FontAwesomeIcon icon={faCaretSquareDown} />
        </div>
    );
};

export default myPageLink;
