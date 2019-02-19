import React from 'react';
const classes = require('./userDetail.css');

const userDetail = (props: {url: string}) => {
    return (
        <div className={classes.UserDetail} >
            <div className={classes.UserNameBox} >
                <a href={props.url} className={classes.UserName}>
                    sample
                </a>
            </div>
        </div>
    );
};

export default userDetail;
