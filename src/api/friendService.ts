import { useMutation, useQuery } from 'react-query';
import { axiosInstance } from './axios';
import { IInviteFriendRequest } from '@dto/requests/IInviteFriend.Request';
import { IFriend } from '@dto/base/Friend';

const queryKeys = {
  getFriends: 'friendService.getFriends',
};

const getFriends = async (): Promise<IFriend[]> => {
  const response = await axiosInstance.get('/friend');

  return response.data ?? [];
};

const useGetFriends = () => {
  return useQuery(queryKeys.getFriends, () => getFriends());
};

const sendInvite = async (payload: IInviteFriendRequest): Promise<void> => {
  const response = await axiosInstance.post('/friend', payload);
  return response.data ?? [];
};

const useSendInvite = () => {
  return useMutation(sendInvite);
};

export default {
  useSendInvite,
  useGetFriends,
};
