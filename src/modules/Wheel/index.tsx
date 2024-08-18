import AppLayout from '@components/AppLayout';
import { IFriend } from '@dto/base/Friend';
import { useState } from 'react';
import SelectFriends from './SelectFriends';
import { useNavigate, useParams } from 'react-router-dom';
import { WheelSteps } from './typings';
import wheelService from '@api/wheelService';
import Room from './Room';
import useLang from '@hooks/useLang';

const Wheel = () => {
  const navigate = useNavigate();
  const { step } = useParams();
  const { getLang } = useLang('wheel');
  const [selectedFriends, setSelectedFriends] = useState<IFriend[]>([]);
  const { mutate: createRoom } = wheelService.useCreateRoom();

  const handleNextStep = () => {
    if (step === WheelSteps.FRIENDS) {
      createRoom(
        {
          users: selectedFriends.map((f) => f.user.id),
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
        <div className=" text-deepNavy-500 pb-12">
          {step === WheelSteps.FRIENDS && (
            <div className="text-4xl font-bold">{getLang('selectFriends')}</div>
          )}
          {step === WheelSteps.ROOM && (
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">{getLang('room')}</div>
              <div className="flex items-center gap-2">
                <div className="font-bold">{getLang('link')}</div>
                <div className="text-md w-fit bg-white border rounded-xl p-2.5">
                  {location.href}
                </div>
              </div>
            </div>
          )}
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
