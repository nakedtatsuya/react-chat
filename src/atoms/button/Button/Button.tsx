import React, { ReactNode } from 'react';
const classes = require('./Button.css');

const Button = (props: {children: ReactNode, click: () => void, buttonType: string}) => {
    return (
        <div className={[classes.Button, props.buttonType].join(' ')}>
            <button onClick={props.click}>{props.children}</button>
        </div>
    );
};

export default Button;
