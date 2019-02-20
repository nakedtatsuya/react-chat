import React from 'react';
const classes = require('./homeImage.css');
const TopImage = require('../../assets/images/topimage.png');

const homeImage = () => {
    return (
        <div className={classes.ImageWrapper}>
            <img src={TopImage} alt="Registrations view" />
        </div>
    )
};

export default homeImage;
