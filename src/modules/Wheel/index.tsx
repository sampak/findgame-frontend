import userService from '@api/userService';
import AppLayout from '@components/AppLayout';
import Button from '@components/Button';
import { IFriend } from '@dto/base/Friend';
import { useContext, useState } from 'react';
import SelectFriends from './SelectFriends';
import { useNavigate, useParams } from 'react-router-dom';
import { WheelSteps } from './typings';
import SelectGames from './SelectGames';
import { IGame } from '@dto/base/Game';
import wheelService from '@api/wheelService';
import Room from './Room';

const Wheel = () => {
  const navigate = useNavigate();
  const { step, roomId } = useParams();
  const [selectedFriends, setSelectedFriends] = useState<IFriend[]>([]);
  const { mutate: createRoom } = wheelService.useCreateRoom();

  const handleNextStep = () => {
    if (step === WheelSteps.FRIENDS) {
      createRoom(
        {
          users: selectedFriends.map((f) => f.id),
        },
        {
          onSuccess: (response) => {
            navigate(`/wheel/${WheelSteps.ROOM}/${response.id}`);
          },
        }
      );
    }
  };

  return (
    <AppLayout>
      <div className="flex h-full flex-col">
        <div className="text-4xl text-deepNavy-500 font-bold pb-12">
          {step === WheelSteps.FRIENDS && 'Select friends'}
          {step === WheelSteps.ROOM && 'Room'}
        </div>
        {step === WheelSteps.FRIENDS && (
          <SelectFriends
            selectedFriends={selectedFriends}
            setSelectedFriends={setSelectedFriends}
            handleNextStep={handleNextStep}
          />
        )}
        {step === WheelSteps.ROOM && <Room />}
      </div>
    </AppLayout>
  );
};

export default Wheel;
