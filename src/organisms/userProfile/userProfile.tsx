import React, { Component} from 'react';

const classes = require('./userProfile.css');
import UserImage from '../../atoms/userImage/userImage';
const imageCSS = require('../../atoms/userImage/userImage.css');
const { Link, withRouter } = require('react-router-dom');
import Spinner from '../../atoms/Spinner/Spinner';

/**
 * プロフィール画面コンテナー
 */
class userProfile extends Component<any, any> {

    /**
     *
     * @returns {any}
     */
    render() {
        const {id, name, email, image} = this.props.friend;
        //自分の画面でだけ編集画面ボタン表示
        let editButton = null;
        if (this.props.auth.currentUser.id == id) {
            editButton = (
                <Link to={`/users/${this.props.match.params.id}/edit`}>
                    プロフィール編集
                </Link>
            );
        }

        return (
            <div className={classes.UserProfile}>
                <UserImage imageURL={image} imageClass={imageCSS.MyPageImage}  />
                <div className={classes.UserProfileName}>
                    {name}
                </div>
                <div className={classes.UserProfileEmail}>
                    {email}
                </div>
                {editButton}
            </div>
        );
    }
}

export default withRouter(userProfile);
