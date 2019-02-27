import React, { Component } from 'react';
import UserProfile from '../../organisms/userProfile/userProfile';
import UserProfileEdit from '../../organisms/userProfileEdit/userProfileEdit';
const { Route, Switch } = require('react-router-dom');
import Header from '../../organisms/header/header';
import FriendDispatcher from "../../modules/friend/friendAction";
import AuthDispatcher from "../../modules/auth/authAction";
const { withRouter } = require('react-router-dom');

/**
 * userプロフィールと編集のコンテナー
 */
class User extends Component<any, any> {

    /**
     * プロフィール編集の画像変更時の更新メソッド
     * formからdataを変換して送信
     */
    sendImageHandler = (event: any) => {
        const params = new FormData();
        const fileSelectDom = event.target.files[0];
        params.append('image', fileSelectDom);
        AuthDispatcher.putImage(params, this.props);
        this.props.history.push(`/users/${this.props.auth.currentUser.id}`)
    };

    /**
     * リロード時はここからユーザー情報取得
     */
    componentDidMount(){
        FriendDispatcher.show(this.props.match.params.id);
    }

    render() {
        //詳細画面と編集画面のルーティング
        return (
            <>
                <Header {...this.props} />
                <Switch>
                    <Route path='/users/:id/edit' exact render={(match: any) => (
                        <UserProfileEdit imageHandler={this.sendImageHandler} match={match} {...this.props} />
                    )} />
                    <Route path='/users/:id' exact render={(match: any) => (
                        <UserProfile match={match} {...this.props} />
                    )} />
                </Switch>
            </>
        );
    }
}

export default withRouter(User);
