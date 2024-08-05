import friendService from '@api/friendService';
import FriendCard from '../FriendCard';
import { FriendStatus } from '@dto/base/FriendStatus';
import { useContext, useEffect } from 'react';
import { FRIEND_ACTIONS } from '@reducers/friendsReducer';
import FriendsContext from '@contexts/FriendsContext';

export const FriendList = () => {
  const { data } = friendService.useGetFriends();

  const { friends, dispatch } = useContext(FriendsContext);

  const setFriends = (friends) => {
    dispatch({ type: FRIEND_ACTIONS.SET_FRIENDS, payload: friends });
  };

  useEffect(() => {
    setFriends(data);
  }, [data]);

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
