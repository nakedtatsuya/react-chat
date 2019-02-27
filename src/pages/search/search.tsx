import React, { Component } from 'react';
const classes = require('./search.css');
import SearchUserList from '../../organisms/searchUserList/searchUserList';
import ChatSearchLogo from '../../molecules/chatSearchLogo/chatSearchLogo';
import Header from '../../organisms/header/header';
import axios from "../../axios-order";
import FriendDispatcher from "../../modules/friend/friendAction";

const { withRouter } = require('react-router-dom');

/**
 * ユーザー検索コンテナー
 */
class Search extends Component<any, any> {

    state = {
      value: '',
      userList: []
    };

    /**
     * 検索タブに入力されるたびにユーザーを検索
     * @param event
     */
    inputChangeHandler = (event: any) => {
         this.setState({value: event.target.value});
         if(event.target.value !== null && event.target.value !== '') {
             //Like検索 %name% クエリパラメーターで送ってみた
             axios.get(`/users?name=${event.target.value}`,{
                 headers: this.props.auth.headers
             })
             .then((result: any) => {
                 this.setState({userList: result.data});
             }).catch((error: any) => {
                 console.log(error);
             })
         }else {
             //なにも入力がない時は空にセット
             this.setState({userList: []});
         }
    };

    //formアクションは何も起こさない
    submitHandler = (event: any) => {
        event.preventDefault();
    };

    /**
     * 検索ユーザーのクリックアクション
     * 友達リストに追加してchat画面にリダイレクト
     * @param {number} id ユーザーID
     */
    addFriendHandler = (id: number) => {
        FriendDispatcher.addFriend(id);
        this.props.history.replace('/');
    };

    render() {
        return (
            <>
                <Header {...this.props} />
                <div id={classes.SearchContainer}>
                    <div className={classes.Search}>
                        <ChatSearchLogo />
                        <form onSubmit={this.submitHandler}>
                            <input
                                onChange={this.inputChangeHandler}
                                type="text" className={classes.SearchInput}
                                placeholder="ユーザー名で検索しよう"
                            />
                        </form>
                        <SearchUserList
                            click={this.addFriendHandler}
                            userList={this.state.userList}
                            currentUser={this.props.auth.currentUser}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Search);
