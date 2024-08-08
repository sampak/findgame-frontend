import friendService from '@api/friendService';
import FriendCard from '../FriendCard';
import { FriendStatus } from '@dto/base/FriendStatus';
import { useContext, useEffect } from 'react';
import { FRIEND_ACTIONS } from '@reducers/friendsReducer';
import FriendsContext from '@contexts/FriendsContext';
import useSocket from '@hooks/useSocket';

export const FriendList = () => {
  const { data } = friendService.useGetFriends();

  const { friends, dispatch } = useContext(FriendsContext);

  const { socket } = useSocket();

  const setFriends = (friends) => {
    dispatch({ type: FRIEND_ACTIONS.SET_FRIENDS, payload: friends });
  };

  useEffect(() => {
    setFriends(data);
  }, [data]);

  const handleMessage = (msg) => {
    console.log(msg);
  };

  useEffect(() => {
    socket?.on('read_message', handleMessage);

    return () => {
      socket?.off('read_message', handleMessage);
    };
  }, [socket]);

  const send = () => {
    socket.emit('send_message', 'Test');
  };

  return (
    <div className="flex flex-col h-full">
      <div onClick={send}>Test</div>
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
