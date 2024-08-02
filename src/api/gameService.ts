import { useMutation } from "react-query";
import { axiosInstance } from "./axios";
import { IGetSteamIdDTO } from "@dto/response/IGetSteamIdDTO";

const getSteamGames = async (payload: { steamName: string }): Promise<IGetSteamIdDTO> => {
  const response = await axiosInstance.post(`/game/steam`, payload);

  return response.data;
}

const useGetSteamGames = () => {
return useMutation(getSteamGames)
}

export default {
  useGetSteamGames
}