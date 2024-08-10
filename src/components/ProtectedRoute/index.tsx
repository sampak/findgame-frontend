import { FC, Props } from './typings';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import userService from '@api/userService';
import UserContext from '@contexts/UserContext';
import { User } from '@dto/base/User';
import { getToken, removeToken } from '@api/user';
import LoadingScreen from '@components/LoadingScreen';
import useSocket from '@hooks/useSocket';

const ProtectedRoute: FC<Props> = ({ children }) => {
  const access_token = getToken();
  const navigate = useNavigate();
  const { data, refetch, isError, isFetching } = userService.useGetMe();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { connect } = useSocket();

  useEffect(() => {
    if (!access_token) {
      navigate('/auth/sign-in');
    }
    setLoading(true);
    refetch();
  }, []);

  useEffect(() => {
    if (isFetching) return;
    const user = data as User;

    if (user?.id) {
      connect(access_token);
      setUser(user);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      removeToken();
      navigate('/auth/sign-in');
    }
  }, [isError]);

  const showLoadingScreen = loading || isFetching;

  if (showLoadingScreen) {
    return <LoadingScreen />;
  }

  return children;
};

export default ProtectedRoute;
