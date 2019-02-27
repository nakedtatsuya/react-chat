import { ReduceStore } from 'flux/utils';
import FriendDispatcher from '../dispatcher';
import actionTypes from '../actionTypes';
import { updateObject } from '../utility';

/**
 * FriendStore
 */
class FriendStore extends ReduceStore<any, any> {

    //詳細ユーザー、チャットリスト、友達リスト管理
    getInitialState() {
        return {
            id: null,
            name: null,
            email: null,
            image: null,
            friendList: [],
            chatList: [],
            loading: false,
            error: null,
            activeUserId: 0
        };
    }

    //アクションに応じてstate更新
    reduce(state: any, action: any) {
        switch (action.type) {
            case actionTypes.FRIEND_SUCCESS:
                return friendSuccess(state, action);
            case actionTypes.FRIEND_FAIL:
                return friendFail(state, action);
            case actionTypes.FRIEND_LIST:
                return friendListSuccess(state, action);
            case actionTypes.FRIEND_CAHT_LIST:
                return friendChatSuccess(state, action);
            case actionTypes.FRIEND_ADD_CHAT:
                return friendAddChat(state, action);
            case actionTypes.FRIEND_FRESH:
                return friendFresh(state, action);
            default:
                return state;
        }
    }
}

const friendSuccess = (state: any, action: any) => {
    return updateObject(state, {
        id: action.id,
        name: action.name,
        email: action.email,
        image: action.image,
        loading: false,
        error: null
    });
};

const friendFresh = (state: any, action: any) => {
    return updateObject(state, {
        id: null,
        name: null,
        email: null,
        image: null,
        friendList: [],
        chatList: [],
        loading: false,
        error: null,
        activeUserId: 0
    });
};

const friendChatSuccess = (state: any, action: any) => {
    return updateObject(state, {
        activeUserId: action.activeUserId,
        chatList: action.chatList,
        loading: false,
        error: null
    });
};

const friendAddChat = (state: any, action: any) => {
    return updateObject(state, {
        chatList: action.chatList,
        loading: false,
        error: null
    });
};

const friendListSuccess = (state: any, action: any) => {
    return updateObject(state, {
        friendList: action.friendList,
        activeUserId: action.activeUserId,
        chatList: action.chatList,
        loading: false,
        error: null
    });
};

const friendFail = (state: any, action: any) => {
    return updateObject(state, {error: action.error, loading: false});
};

export default new FriendStore(FriendDispatcher);