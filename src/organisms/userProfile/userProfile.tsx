import React, { Component} from 'react';

const classes = require('./userProfile.css');
import UserImage from '../../atoms/userImage/userImage';
import Button from '../../atoms/button/Button/Button';
const image = require('../../atoms/userImage/userImage.css');
const button = require('../../atoms/button/Button/Button.css');
import axios from "../../axios-order";
const { Link, withRouter } = require('react-router-dom');

class userProfile extends Component<any, any> {

    state = {
        id: null,
        name: null,
        email: null
    };

    changeEditPageHandler = () => {
        this.props.history.push(`/users/edit/${this.props.match.params.id}`);
    };

    componentDidMount(){
        //get user/show
        axios.get(`/users/${this.props.match.params.id}`, {
            headers: {
                accessToken: this.props.auth.token,
                uid: this.props.auth.uid,
                client: this.props.auth.client,
            }
        }).then(response => {
            console.log(response)
            this.setState({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
            })
        })
    }

    render() {
        let editButton = null;
        if (this.props.auth.currentUser.id == this.state.id) {
            editButton = (
                <Link to={`/users/edit/${this.props.match.params.id}`}>
                    プロフィール編集
                </Link>
            );
        }

        return (
            <div className={classes.UserProfile}>
                <UserImage imageURL={''} imageClass={image.MyPageImage}  />
                <div className={classes.UserProfileName}>
                    {this.state.name}
                </div>
                <div className={classes.UserProfileEmail}>
                    {this.state.email}
                </div>
                {editButton}
            </div>
        );
    }
}

export default withRouter(userProfile);
