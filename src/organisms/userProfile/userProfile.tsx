import React, { Component} from 'react';
const {withRouter} = require('react-router-dom');

const classes = require('./userProfile.css');
import UserImage from '../../atoms/userImage/userImage';
import Button from '../../atoms/button/Button/Button';
const image = require('../../atoms/userImage/userImage.css');
const button = require('../../atoms/button/Button/Button.css');


interface Props {
    history: {
        push(url: string): void;
    };
}
class userProfile extends Component<Props> {


    changeEditPageHandler = () => {
        this.props.history.push('/users/edit/1');
    };

    render() {
        return (
            <div className={classes.UserProfile}>
                <UserImage imageURL={''} imageClass={image.MyPageImage}  />
                <div className={classes.UserProfileName}>
                    tatsuya
                </div>
                <div className={classes.UserProfileEmail}>
                    nakedtatsuya@gmail.com
                </div>
                <Button click={this.changeEditPageHandler} buttonType={[button.Edit, button.Button].join(' ')}>プロフィール編集</Button>
            </div>
        );
    }
}

export default withRouter(userProfile);
