import friendService from '@api/friendService';
import FriendCard from '../FriendCard';
import { FriendStatus } from '@dto/base/FriendStatus';
import { useContext, useEffect } from 'react';
import { FRIEND_ACTIONS } from '@reducers/friendsReducer';
import FriendsContext from '@contexts/FriendsContext';
import useSocket from '@hooks/useSocket';
import { FriendEvents } from '@dto/socket/FriendEvents';
import { IFriend } from '@dto/base/Friend';

export const FriendList = () => {
  const { data, isFetched } = friendService.useGetFriends();

  const { friends, dispatch } = useContext(FriendsContext);

  const { socket } = useSocket();

  const setFriends = (friends) => {
    dispatch({ type: FRIEND_ACTIONS.SET_FRIENDS, payload: friends });
  };

  useEffect(() => {
    setFriends(data);
  }, [data]);

  const handleSocketInvitation = (msg: IFriend) => {
    dispatch({ type: FRIEND_ACTIONS.ADD_TO_LIST, payload: msg });
  };

  const handleSocketChangeStatus = (msg: {
    id: string;
    status: FriendStatus;
  }) => {
    dispatch({ type: FRIEND_ACTIONS.CHANGE_STATUS, payload: msg });
  };

  const handleRemoveFriend = (msg: { id: string }) => {
    dispatch({ type: FRIEND_ACTIONS.REMOVE, payload: msg });
  };

  const handleSocketOnlineList = (msg) => {
    dispatch({ type: FRIEND_ACTIONS.LOAD_ONLINE_STATUS, payload: msg });
  };

  const handleSocketIsOnline = (msg) => {
    dispatch({
      type: FRIEND_ACTIONS.CHANGE_ONLINE_STATUS,
      payload: {
        id: msg,
        isOnline: true,
      },
    });
  };
  const handleSocketIsOffline = (msg) => {
    dispatch({
      type: FRIEND_ACTIONS.CHANGE_ONLINE_STATUS,
      payload: {
        id: msg,
        isOnline: true,
      },
    });
  };

  useEffect(() => {
    socket?.on(FriendEvents.FRIEND_INVITATION, handleSocketInvitation);
    socket?.on(FriendEvents.FRIEND_STATUS_CHANGE, handleSocketChangeStatus);
    socket?.on(FriendEvents.FRIEND_REMOVE, handleRemoveFriend);
    socket?.on(FriendEvents.FRIEND_ONLINE_LIST, handleSocketOnlineList);
    socket?.on(FriendEvents.FRIEND_OFFLINE, handleSocketIsOffline);
    socket?.on(FriendEvents.FRIEND_ONLINE, handleSocketIsOnline);

    return () => {
      socket?.off(FriendEvents.FRIEND_INVITATION, handleSocketInvitation);
      socket?.off(FriendEvents.FRIEND_STATUS_CHANGE, handleSocketChangeStatus);
      socket?.off(FriendEvents.FRIEND_REMOVE, handleRemoveFriend);
      socket?.off(FriendEvents.FRIEND_ONLINE_LIST, handleSocketOnlineList);
      socket?.off(FriendEvents.FRIEND_OFFLINE, handleSocketIsOffline);
      socket?.off(FriendEvents.FRIEND_ONLINE, handleSocketIsOnline);
    };
  }, [socket]);

  useEffect(() => {
    if (!isFetched) return;
    socket.emit(FriendEvents.FRIEND_ONLINE_LIST);
  }, [isFetched]);

  return (
    <div className="flex flex-col h-full">
      <div className="text-2xl text-deepNavy-500 font-bold pb-6 pt-6 pl-4">
        Friends
      </div>
      <div className="overflow-auto h-full px-4">
        {friends
          ?.filter(
            (friend) =>
              (!friend.myInvitation &&
                friend.status === FriendStatus.INVITED) ||
              friend.status === FriendStatus.FRIENDS
          )
          .map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
      </div>
    </div>
  );
};
