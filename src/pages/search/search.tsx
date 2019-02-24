import React, { Component } from 'react';
const classes = require('./search.css');
import SearchUserList from '../../organisms/searchUserList/searchUserList';
import ChatSearchLogo from '../../molecules/chatSearchLogo/chatSearchLogo';
import Header from '../../organisms/header/header';
import axios from "../../axios-order";

const { withRouter } = require('react-router-dom');

class Search extends Component<any, any> {

    state = {
      value: '',
      userList: []
    };

    inputChangeHandler = (event: any) => {
         this.setState({value: event.target.value});
         if(event.target.value !== null && event.target.value !== '') {
             //Like検索 %name%
             axios.get(`/users?name=${event.target.value}`,{
                 headers: {
                     accessToken: this.props.auth.token,
                     uid: this.props.auth.uid,
                     client: this.props.auth.client
                 }
             })
             .then(result => {
                 this.setState({userList: result.data});
             }).catch(e => {
                 console.log(e)
             })
         }else {
             //なにも入力がない時は空にセット
             this.setState({userList: []});
         }
    };

    submitHandler = (event: any) => {
        event.preventDefault();
    };

    addFriendHandler = (id: number) => {
      axios.post('/friendships', {
          from_user_id: this.props.auth.currentUser.id,
          to_user_id: id

      }, {
          headers: {
              accessToken: this.props.auth.token,
              uid: this.props.auth.uid,
              client: this.props.auth.client
          }
      }).then(response => {
        this.props.history.replace('/');
      })
    };


    render() {
        return (
            <>
                <Header/>
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
                            currentUserId={this.props.auth.currentUser.id}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Search);
