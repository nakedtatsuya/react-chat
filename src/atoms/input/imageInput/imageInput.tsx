import React from 'react';
const classes = require('./imageInput.css');

const imageInput = () => (
    <div className={classes.ImageInput}>
        <input type="file" />
    </div>
);

export default imageInput;