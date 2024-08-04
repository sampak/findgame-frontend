import friendService from '@api/friendService';
import FriendCard from '../FriendCard';

export const FriendList = () => {
  const { data: friends } = friendService.useGetFriends();

  return (
    <div className="flex flex-col h-full">
      <div className="text-2xl text-deepNavy-500 font-bold pb-6 pt-6 pl-4">
        Friends
      </div>
      <div className="overflow-auto h-full px-4">
        {friends?.map((friend) => (
          <FriendCard friend={friend} />
        ))}
      </div>
    </div>
  );
};
