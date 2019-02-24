import React from 'react';

const classes = require('./Input.css');

const input = ( props: any ) => {
    let inputElement = null;
    const inputClasses = [classes.FormControl];
    let errorClass = '';
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        errorClass = classes.Invalid;
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = (
                <input
                    className={`${classes.FormControl} ${errorClass}`}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        default:
            inputElement = (
                <input
                    className={`${classes.FormControl} ${errorClass}`}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
    }

    return (
        <div className={classes.FormGroup}>
            {inputElement}
        </div>
    );

};

export default input;