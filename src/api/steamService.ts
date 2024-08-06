import { useMutation } from 'react-query';
import { axiosInstance } from './axios';
import { IGetSteamIdDTO } from '@dto/response/IGetSteamIdDTO';

// const queryKeys = {
//   getLink: 'steamService.getLink',
// };

const getSteamId = async (payload: {
  value: string;
}): Promise<IGetSteamIdDTO> => {
  const response = await axiosInstance.get(`/steam/steamid/${payload.value}`);

  return response.data;
};

const useGetSteamId = () => {
  return useMutation(getSteamId);
};

const getLink = async (): Promise<string> => {
  const response = await axiosInstance.get('/steam/login');

  return response.data ?? '';
};

const useGetLink = () => {
  return useMutation(getLink);
};

const verify = async (payload: any) => {
  const response = await axiosInstance.post('/steam/verify', payload);
  return response.data ?? [];
};

const useVerify = () => {
  return useMutation(verify);
};

export default {
  useGetSteamId,
  useGetLink,
  useVerify,
};
