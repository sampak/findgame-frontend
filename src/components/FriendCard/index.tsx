import Avatar from '../Avatar';

import MoreIcon from '@assets/icons/more.svg?react';

const FriendCard = ({ friend }) => {
  return (
    <div className="border-b ">
      <div className="w-full cursor-pointer h-[64px] hover:bg-deepNavy-100 flex justify-between rounded-md px-2">
        <div className="flex gap-5 items-center">
          <Avatar user={friend.user} />
          <div className="font-semibold">{friend.user.login}</div>
          <div className="font-semibold">{friend.status}</div>
        </div>
        <div className="flex items-center">
          <MoreIcon className="hover:bg-deepNavy-200 rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
