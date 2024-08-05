import { IFriend } from '@dto/base/Friend';
import { FriendStatus } from '@dto/base/FriendStatus';

export enum FRIEND_ACTIONS {
  SET_FRIENDS = 'SET_FRIENDS',
  ACCEPT = 'ACCEPT',
  REMOVE = 'REMOVE',
}

type SetFriendsAction = {
  type: FRIEND_ACTIONS.SET_FRIENDS;
  payload: IFriend[];
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
  | RemoveFriendsAction;

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
    default:
      throw new Error(`Unknown action type`);
  }
};
