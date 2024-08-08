import { useMutation, useQuery } from 'react-query';
import { axiosInstance } from './axios';
import { IInviteFriendRequest } from '@dto/requests/IInviteFriend.Request';
import { IFriend } from '@dto/base/Friend';
import { IChangeFriendRequest } from '@dto/requests/IChangeFriendRequest';

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

const sendInvite = async (payload: IInviteFriendRequest): Promise<IFriend> => {
  const response = await axiosInstance.post('/friend', payload);
  return response.data ?? [];
};

const useSendInvite = () => {
  return useMutation(sendInvite);
};

const accept = async (payload: IChangeFriendRequest) => {
  return axiosInstance.put('/friend/accept', payload);
};

const useAccept = () => {
  return useMutation(accept);
};

const declineOrRemove = async (payload: IChangeFriendRequest) => {
  return axiosInstance.delete('/friend', {
    data: payload,
  });
};

const useDeclineOrRemove = () => {
  return useMutation(declineOrRemove);
};

export default {
  useSendInvite,
  useGetFriends,
  useAccept,
  useDeclineOrRemove,
};
