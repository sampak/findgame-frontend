import { useMutation } from "react-query";
import { axiosInstance } from "./axios";
import { IGetSteamIdDTO } from "@dto/response/IGetSteamIdDTO";

// const queryKeys = {
//   getSteamId: (value: string) => ['steamService.getSteamId', value],
// };


const getSteamId = async (payload: { value: string }): Promise<IGetSteamIdDTO> => {
    const response = await axiosInstance.get(`/steam/steamid/${payload.value}`);

    return response.data;
}

const useGetSteamId = () => {
  return useMutation(getSteamId)
}

export default {
  useGetSteamId,

}
