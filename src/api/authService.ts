import { useMutation } from 'react-query';
import { axiosInstance } from './axios';
import { ISignInRequest } from '../dto/requests/ISignIn.Request';
import { ISignUpRequest } from '../dto/requests/ISignUp.Request';

const signIn = async (payload: ISignInRequest) => {
  const response = await axiosInstance.post('/user/signin', payload);
  return response.data ?? [];
};

const useSignIn = () => {
  return useMutation(signIn);
};

const signUp = async (payload: ISignUpRequest) => {
  const response = await axiosInstance.post('/user', payload);
  return response.data ?? [];
};

const useSignUp = () => {
  return useMutation(signUp);
};

export default {
  useSignIn,
  useSignUp,
};
