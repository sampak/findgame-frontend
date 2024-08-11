import { IWheelCreateRoom } from '@dto/requests/IWheelCreateRoom';
import { axiosInstance } from './axios';
import { IWheelRoom } from '@dto/base/WheelRoom';
import { useMutation, useQuery } from 'react-query';
import { IGame } from '@dto/base/Game';

const queryKeys = {
  get: (roomId: string) => ['wheelService.get', roomId],
  getSharedGames: (roomId: string) => ['wheelService.getSharedGames', roomId],
};

const get = async (roomId: string): Promise<IWheelRoom> => {
  const response = await axiosInstance.get(`/wheel/${roomId}`);

  return response.data ?? [];
};

const useGet = (roomId: string) => {
  return useQuery(queryKeys.get(roomId), () => get(roomId));
};

const getShared = async (roomId: string): Promise<IGame[]> => {
  const response = await axiosInstance.get(`/wheel/${roomId}/games`);

  return response.data ?? [];
};

const useGetShared = (roomId: string) => {
  return useQuery(queryKeys.getSharedGames(roomId), () => getShared(roomId));
};

const createRoom = async (payload: IWheelCreateRoom): Promise<IWheelRoom> => {
  const response = await axiosInstance.post('/wheel', payload);

  return response.data ?? [];
};

const useCreateRoom = () => {
  return useMutation(createRoom);
};

export default {
  useGet,
  useGetShared,
  useCreateRoom,
};
