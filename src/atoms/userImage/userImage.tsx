import React from 'react';
const classes = require('./userImage.css');
const DefaultImage = require('../../assets/images/default_image.jpg');

const userImage = (props: {imageURL: string, imageClass: string}) => {
    return (
        <div className={props.imageClass}>
            <img src={DefaultImage} />
        </div>
);
};

export default userImage;
