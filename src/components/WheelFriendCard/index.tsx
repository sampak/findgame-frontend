import Avatar from '../Avatar';
import useLang from '@hooks/useLang';
import { FC, Props } from './typings';

// hover:bg-deepNavy-100

const WheelFriendCard: FC<Props> = ({ friend, onClick, isSelected }) => {
  const { getLang } = useLang('friendCard');

  return (
    <div
      onClick={() => onClick(friend)}
      className={`w-full h-fit ${
        isSelected ? 'bg-deepNavy-200' : 'bg-white'
      } hover:bg-deepNavy-100 cursor-pointer rounded-md shadow sm:w-1/2 md:w-1/34 lg:w-1/4`}
    >
      <div className="w-full h-[64px] flex justify-between rounded-md px-2">
        <div className="flex gap-5 items-center">
          <Avatar user={friend?.user} isOnline={false} />
          <div className="font-semibold">{friend?.user?.login}</div>
        </div>
      </div>
    </div>
  );
};

export default WheelFriendCard;
