import { IFriend } from '@dto/base/Friend';
import { FriendStatus } from '@dto/base/FriendStatus';

export enum FRIEND_ACTIONS {
  SET_FRIENDS = 'SET_FRIENDS',
  ADD_TO_LIST = 'ADD_TO_LIST',
  ACCEPT = 'ACCEPT',
  REMOVE = 'REMOVE',
  CHANGE_STATUS = 'CHANGE_STATUS',
  CHANGE_ONLINE_STATUS = 'CHANGE_ONLINE_STATUS', // TODO
}

type SetFriendsAction = {
  type: FRIEND_ACTIONS.SET_FRIENDS;
  payload: IFriend[];
};

type AddToList = {
  type: FRIEND_ACTIONS.ADD_TO_LIST;
  payload: IFriend;
};

type changeFriendStatus = {
  type: FRIEND_ACTIONS.CHANGE_STATUS;
  payload: {
    id: string;
    status: FriendStatus;
  };
};

type AcceptFriendsAction = {
  type: FRIEND_ACTIONS.ACCEPT;
  payload: {
    id: string;
  };
};

type RemoveFriendsAction = {
  type: FRIEND_ACTIONS.REMOVE;
  payload: {
    id: string;
  };
};

type friendState = {
  friends: IFriend[];
};

export type FriendsAction =
  | SetFriendsAction
  | AcceptFriendsAction
  | RemoveFriendsAction
  | changeFriendStatus
  | AddToList;

export const friendsReducer = (state: friendState, action: FriendsAction) => {
  switch (action.type) {
    case FRIEND_ACTIONS.SET_FRIENDS:
      return {
        ...state,
        friends: action.payload,
      };
    case FRIEND_ACTIONS.ACCEPT:
      return {
        ...state,
        friends: state.friends.map((friend) =>
          friend.id === action.payload.id
            ? { ...friend, status: FriendStatus.FRIENDS }
            : friend
        ),
      };
    case FRIEND_ACTIONS.REMOVE:
      return {
        ...state,
        friends: state.friends.filter(
          (friend) => friend.id !== action.payload.id
        ),
      };
    case FRIEND_ACTIONS.ADD_TO_LIST:
      action.payload.isOnline = true;
      return {
        ...state,
        friends: [...state.friends, action.payload],
      };
    case FRIEND_ACTIONS.CHANGE_STATUS:
      return {
        ...state,
        friends: state.friends.map((friend) =>
          friend.id === action.payload.id
            ? { ...friend, status: action.payload.status }
            : friend
        ),
      };
    default:
      throw new Error(`Unknown action type`);
  }
};
