import Button from '@components/Button';
import WheelFriendCard from '@components/WheelFriendCard';
import FriendsContext from '@contexts/FriendsContext';
import { IFriend } from '@dto/base/Friend';
import { useContext } from 'react';

const SelectFriends = ({
  selectedFriends,
  setSelectedFriends,
  handleNextStep,
}: {
  selectedFriends: IFriend[];
  setSelectedFriends: (selectedFriends: IFriend[]) => void;
  handleNextStep: () => void;
}) => {
  const { friends } = useContext(FriendsContext);

  const handleClickFriend = (friend: IFriend) => {
    const isExist = selectedFriends.find((f) => f.id === friend.id);
    if (isExist) {
      setSelectedFriends(selectedFriends.filter((f) => f.id !== friend.id));
      return;
    }

    setSelectedFriends([...selectedFriends, friend]);
  };

  return (
    <>
      <div className="flex gap-4 flex-wrap justify-center h-full overflow-auto">
        {friends?.map((friend) => (
          <WheelFriendCard
            key={friend.id}
            isSelected={!!selectedFriends?.find((f) => f.id === friend.id)}
            onClick={handleClickFriend}
            friend={friend}
          />
        ))}
      </div>
      <div className="flex items-center justify-end pt-5">
        <Button onClick={handleNextStep} isDisabled={!selectedFriends.length}>
          Next
        </Button>
      </div>
    </>
  );
};

export default SelectFriends;
