import FriendDispatcher from '../dispatcher';
import actionTypes from '../actionTypes';
import axios from '../../axios-order';
import FluxContainer from '../fluxContainer';

/**
 * アクション処理、最終的にはDispatcherクラスを呼ぶ
 * @type {{show(id: number): void; friendSuccess(response: any): void; friendFail(error: any): void; friendList(): void; defaultChatPage(newFriendList: any): void; listSuccess(friendResponse: any, chatResponse: any): void; chatSuccess(response: any, id: number): void; postMessage(value: string): void; postImageMessage(params: any): void; addChatList(response: any): void; chatList(id: number): void; deleteFriend(id: number): void; addFriend(id: number): void; friendFresh(): void}}
 */
const FriendActionCreators = {   //ActionCreators

    /**
     * ユーザー詳細取得
     * @param {number} id
     */
    show(id: number){
        axios.get(`/users/${id}`, {
            headers: FluxContainer.calculateState().auth.headers
            }).then((response: any) => {
                this.friendSuccess(response);
            }).catch((error: any) => {
                this.friendFail(error);
             });
    },

    /**
     * ユーザー詳細更新
     * @param response
     */
    friendSuccess(response: any) {
        FriendDispatcher.dispatch({
            type: actionTypes.FRIEND_SUCCESS,
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            image: response.data.image.url
        });
    },
    /**
     * ユーザー詳細取得失敗
     * @param error
     */
    friendFail(error: any) {
        FriendDispatcher.dispatch({
            type: actionTypes.FRIEND_FAIL,
            error: error.data.id,
        });
    },

    /**
     * 友達リスト取得,友達リストの先頭のチャットリストも取得
     */
    friendList() {
        axios.get('/users/friends', {
            headers: FluxContainer.calculateState().auth.headers
        }).then((friendResponse: any) => {
            if(friendResponse.data.length > 0) {
                this.defaultChatPage(friendResponse.data);
            }
        }).catch((error: any) => {
            console.log(error);
        });
    },

    /**
     * 初回はリストの先頭の友達のチャット取得
     * @param newFriendList
     */
    defaultChatPage(newFriendList: any) {
        axios.get(`/messages/${newFriendList[0].id}`, {
            headers: FluxContainer.calculateState().auth.headers
        }).then((chatResponse: any) => {
            this.listSuccess(newFriendList, chatResponse);
        }).catch((error: any) => {
            console.log(error);
        });
    },

    /**
     * 友だとリストとチャットリスト更新
     * @param friendResponse
     * @param chatResponse
     */
    listSuccess(friendResponse: any, chatResponse: any){
        FriendDispatcher.dispatch({
            type: actionTypes.FRIEND_LIST,
            friendList: friendResponse,
            activeUserId: friendResponse[0].id,
            chatList: chatResponse.data
        });
    },

    /**
     * アクティブユーザーのチャットリストに更新
     * @param response
     * @param {number} id
     */
    chatSuccess(response: any, id: number){
        FriendDispatcher.dispatch({
            type: actionTypes.FRIEND_CAHT_LIST,
            activeUserId: id,
            chatList: response.data
        });
    },

    /**
     * テキストメッセージ送信
     * @param {string} value
     */
    postMessage(value: string){
        axios.post('/messages', {
            message: value,
            to_id: FluxContainer.calculateState().friend.activeUserId,
            from_id: FluxContainer.calculateState().auth.currentUser.id
        }, {
            headers: FluxContainer.calculateState().auth.headers
        }).then((response: any) => {
            this.addChatList(response);
        });
    },
    /**
     * 画像メッセージ送信
     * @param {string} params
     */
    postImageMessage(params: any){
        axios.post(`/messages/image/${FluxContainer.calculateState().friend.activeUserId}`, params, {
            headers: FluxContainer.calculateState().auth.headers
        }).then((response: any) => {
            this.addChatList(response);
        });
    },


    /**
     * 新メッセージはチャットリストの最後尾に追加
     * @param response
     */
    addChatList(response: any){
        const newChatList = FluxContainer.calculateState().friend.chatList;
        newChatList.push(response.data);
        FriendDispatcher.dispatch({
            type: actionTypes.FRIEND_ADD_CHAT,
            chatList: newChatList
        });
    },

    /**
     * アクティブユーザーのチャットリスト取得処理
     * @param {number} id
     */
    chatList(id: number) {
        axios.get(`/messages/${id}`, {
            headers: FluxContainer.calculateState().auth.headers
        }).then((response: any) => {
            this.chatSuccess(response, id);
        });
    },
    /**
     * 削除後に友達がいないなら状態フレッシュ
     * @param {number} id
     */
    deleteFriend(id: number) {
        axios.delete(`/friendships/${id}`, {
            headers: FluxContainer.calculateState().auth.headers
        }).then((response: any) => {
            //削除ユーザーを友達リストから外す
            const newUserList = FluxContainer.calculateState().friend.friendList.filter((user: any) => {
                return user.id !== id
            });

            if(newUserList.length > 0) {
                this.defaultChatPage(newUserList);
            }else {
                this.friendFresh();
            }
        });
    },

    /**
     * 友達をリストの最後尾に追加
     * @param {number} id
     */
    addFriend(id: number) {
        axios.post('/friendships', {
            from_user_id: FluxContainer.calculateState().auth.currentUser.id,
            to_user_id: id
        }, {
            headers: FluxContainer.calculateState().auth.headers
        }).then((response: any) => {
            const newUserList = [...FluxContainer.calculateState().friend.friendList];
            newUserList.push(response.data);
            console.log(newUserList);
            this.defaultChatPage(newUserList);
        })
    },

    /**
     * 初期値に更新
     */
    friendFresh() {
        FriendDispatcher.dispatch({
            type: actionTypes.FRIEND_FRESH,
        });
    },

};

export default FriendActionCreators