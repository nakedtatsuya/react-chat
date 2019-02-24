import React from 'react';
const classes = require('./userDetail.css');
const { Link } = require('react-router-dom');

const userDetail = (props: {name: string, id: number}) => {
    return (
        <div className={classes.UserDetail} >
            <div className={classes.UserNameBox} >
                <Link to={`/users/${props.id}`} className={classes.UserName}>
                    {props.name}
                </Link>
            </div>
        </div>
    );
};

export default userDetail;
