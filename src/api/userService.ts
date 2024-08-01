import { useMutation, useQuery } from 'react-query';
import { axiosInstance } from './axios';

const queryKeys = {
  getMe: 'userService.getMe',
  getGames: 'userService.getGames',
};

const getMe = async () => {
  const response = await axiosInstance.get('/user/me');

  return response.data ?? [];
};

const useGetMe = () => {
  return useQuery(queryKeys.getMe, () => getMe(), {
    staleTime: 0,
    cacheTime: 0,
  });
};

const updateSteamId = (payload: { steamId: string }) => {
  return axiosInstance.patch("/user/steamid", payload);
}

const useUpdateSteamId = () => {
  return useMutation(updateSteamId);
}

const getMyGames = async () => {
  const response = await axiosInstance.get("/user/games");
  return response.data ?? []
}

const useGetMyGames = () => {
  return useQuery(queryKeys.getGames, () => getMyGames())
}

export default {
  useGetMe,
  useUpdateSteamId,
  useGetMyGames
};
