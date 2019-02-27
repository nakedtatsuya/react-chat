import React from 'react';
const DefaultImage = require('../../assets/images/default_image.jpg');

/**
 * プロフィール画像
 * @param {{imageURL: string; imageClass: string}} props
 * @returns {any}
 */
const userImage = (props: {imageURL: string, imageClass: string}) => {

    //設定がない場合はデフォルト画像
    let url = DefaultImage;
    if (props.imageURL !== null){
        url = props.imageURL;
    }

    return (
        <div className={props.imageClass}>
            <img src={url} />
        </div>
);
};

export default userImage;
