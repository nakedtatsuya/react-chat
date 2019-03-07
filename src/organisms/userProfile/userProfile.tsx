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

    state = {
      flashShow: true
    };

    flashCloseHandler = () => {
        this.props.auth.success = null;
        this.setState({flashShow: false})
    };

    /**
     *
     * @returns {any}
     */
    render() {
        const {id, name, email, image} = this.props.friend;

        let imageURL = image;

        let info = (
            <>
                <div className={classes.UserProfileName}>
                    {name}
                </div>
                <div className={classes.UserProfileEmail}>
                    {email}
                </div>
            </>
        );
        //自分の画面でだけ編集画面ボタン表示
        let editButton = null;
        if (this.props.auth.currentUser.id == id) {
            editButton = (
                <Link to={`/users/${this.props.match.params.id}/edit`}>
                    プロフィール編集
                </Link>
            );

            info = (
              <>
                  <div className={classes.UserProfileName}>
                      {this.props.auth.currentUser.name}
                  </div>
                  <div className={classes.UserProfileEmail}>
                      {this.props.auth.currentUser.email}
                  </div>
              </>
            );

            imageURL = this.props.auth.currentUser.image.url;
        }

        let flash = null;

        if(this.props.auth.success && this.state.flashShow) {
            flash = (
                <div className={classes.flash}>
                    <button onClick={this.flashCloseHandler} aria-label="close" className={classes.close} data-dismiss="alert">
                        ×
                    </button>
                    <p>{this.props.auth.success}</p>
                </div>
            );
            this.props.auth.success = null;
        }



        return (
            <div className={classes.UserProfile}>
                {flash}
                <UserImage imageURL={imageURL} imageClass={imageCSS.MyPageImage}  />
                {info}
                {editButton}
            </div>
        );
    }
}

export default withRouter(userProfile);
