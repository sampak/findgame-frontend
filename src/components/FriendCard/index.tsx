import { FriendStatus } from '@dto/base/FriendStatus';
import Avatar from '../Avatar';

import MoreIcon from '@assets/icons/more.svg?react';
import AcceptIcon from '@assets/icons/check.svg?react';
import DeclineIcon from '@assets/icons/close.svg?react';
import friendService from '@api/friendService';
import { useContext } from 'react';
import FriendsContext from '@contexts/FriendsContext';
import { FRIEND_ACTIONS } from '@reducers/friendsReducer';
import { NotiType, sendNoti } from '@utils/sendNoti';
import { getApiError } from '@utils/getApiError';
import useLang from '@hooks/useLang';

// hover:bg-deepNavy-100

const FriendCard = ({ friend }) => {
  const { mutate: accept } = friendService.useAccept();
  const { mutate: decline } = friendService.useDeclineOrRemove();
  const { dispatch } = useContext(FriendsContext);

  const { getLang } = useLang('friendCard');

  const handleAccept = () => {
    accept(
      {
        inviteId: friend.id,
      },
      {
        onSuccess() {
          dispatch({
            type: FRIEND_ACTIONS.ACCEPT,
            payload: {
              id: friend.id,
            },
          });
        },
        onError: (err) => {
          sendNoti(getApiError(err, getLang), NotiType.ERROR);
        },
      }
    );
  };

  const handleDecline = () => {
    decline(
      {
        inviteId: friend.id,
      },
      {
        onSuccess: () => {
          dispatch({
            type: FRIEND_ACTIONS.REMOVE,
            payload: {
              id: friend.id,
            },
          });
        },

        onError: (err) => {
          sendNoti(getApiError(err, getLang), NotiType.ERROR);
        },
      }
    );
  };

  return (
    <div className="border-b ">
      <div className="w-full h-[64px] flex justify-between rounded-md px-2">
        <div className="flex gap-5 items-center">
          <Avatar user={friend.user} isOnline={friend.isOnline} />
          <div className="font-semibold">{friend.user.login}</div>
        </div>
        <div className="flex items-center">
          {
            <>
              {friend.status !== FriendStatus.INVITED && (
                <MoreIcon className="hover:bg-deepNavy-200 rounded-sm cursor-pointer" />
              )}
              {friend.status === FriendStatus.INVITED && (
                <div className="flex gap-2">
                  <div
                    onClick={handleAccept}
                    className="flex p-[1px] cursor-pointer border-green-400 border group rounded-full hover:bg-green-500"
                  >
                    <AcceptIcon className="fill-green-500 ho group group-hover:fill-white" />
                  </div>

                  <div
                    onClick={handleDecline}
                    className="flex p-[1px] cursor-pointer border-red-400 border group rounded-full hover:bg-red-500"
                  >
                    <DeclineIcon className="fill-red-500 group-hover:fill-white" />
                  </div>
                </div>
              )}
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
