import React, { Component } from 'react';
import UserList from '../../organisms/userList/userList';
import MessageBox from '../../organisms/messageBox/messageBox';
import Header from '../../organisms/header/header';
import axios from '../../axios-order';
import FluxContainer from "../../fluxContainer";
import AuthAction from "../../modules/auth/authAction";
const { Link, withRouter } = require('react-router-dom');

class Chat extends Component<any, any> {

    state: any = {
        userList: [],
        chatList: [],
        activeUser: 0,
        value: ''
    };

    changeChatList = (id: number) => {
        axios.get(`/messages/${id}`, {
            headers: {
                accessToken: this.props.auth.token,
                uid: this.props.auth.uid,
                client: this.props.auth.client,
            }
        }).then(response => {
            this.setState({chatList: response.data,  activeUser: id})
        });
    };

    deleteFriendHandler= (id: number) => {
        const isDelete = confirm('友達削除しますか？(トーク履歴は残ります)');
        if(isDelete) {
            axios.delete(`/friendships/${id}`, {
                headers: {
                    accessToken: this.props.auth.token,
                    uid: this.props.auth.uid,
                    client: this.props.auth.client
                }
            }).then(response => {
                const newUserList = this.state.userList.filter((user: any) => {
                    return user.id !== id
                });
                this.setState({userList: newUserList, activeUser: newUserList[0].id});
            })
        }
    };

    sendMessageHandler = (event: any) => {
        event.preventDefault();
        axios.post('/messages', {
            message: this.state.value,
            to_id: this.state.activeUser,
            from_id: this.props.auth.currentUser.id
        }, {
            headers: {
                accessToken: this.props.auth.token,
                uid: this.props.auth.uid,
                client: this.props.auth.client
            }
        }).then((response: any) => {
            const newMessageList = this.state.chatList.concat(response.data);
            this.setState({chatList: newMessageList, value: ''});
        });
    };

    changeMessageHandler = (event: any) => {
      this.setState({value: event.target.value});
      console.log(event.target.value);
    };

    componentDidMount() {
        axios.get('/users/friends', {
            headers: {
                accessToken: this.props.auth.token,
                uid: this.props.auth.uid,
                client: this.props.auth.client,
            }
        }).then(response => {
            if(response.data.length > 0) {
                this.setState({
                    userList: response.data,
                    activeUser: response.data[0].id
                });

                //リファクタする
                axios.get(`/messages/${response.data[0].id}`, {
                    headers: {
                        accessToken: this.props.auth.token,
                        uid: this.props.auth.uid,
                        client: this.props.auth.client,
                    }
                }).then(response => {
                    console.log(response);
                    this.setState({chatList: response.data})
                })
            }
        }).catch(e => {
            console.log(e);
        });
    }

    componentWillReceiveProps(nextProps: any) {
        axios.get(`/messages/${this.state.activeUser}`, {
            headers: {
                accessToken: this.props.auth.token,
                uid: this.props.auth.uid,
                client: this.props.auth.client,
            }
        }).then(response => {
            console.log(response);
            this.setState({chatList: response.data})
        });
    }

    render() {
        return (
            <>
                <Header
                    name={this.props.auth.name}
                    email={this.props.auth.email}
                    uid={this.props.auth.id}
                />
                <div>
                    <UserList change={this.changeChatList} activeUser={this.state.activeUser} userList={this.state.userList} click={this.deleteFriendHandler} />
                    <MessageBox
                        value={this.state.value}
                        inputHandler={this.changeMessageHandler}
                        formHandler={this.sendMessageHandler}
                        sendId={this.state.activeUser}
                        chatList={this.state.chatList}
                        currentId={this.props.auth.currentUser.id}
                    />
                </div>
            </>
        )
    }
}

export default withRouter(Chat);
