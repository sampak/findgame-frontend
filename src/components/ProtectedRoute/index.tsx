import { FC, Props } from './typings';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import userService from '@api/userService';
import UserContext from '@contexts/UserContext';
import {User} from '@dto/base/User';
import { getToken } from '@api/user';

const ProtectedRoute: FC<Props> = ({ children }) => {
  const access_token = getToken();
  const navigate = useNavigate();
  const { data, refetch, isError, isFetching } = userService.useGetMe();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

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
      console.log('jestem tutaj');
      //   if (user.uiConfiguration?.showOnbording) {
      //     navigate('/onbording/method');
      //   }

      setUser(user);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      // removeToken();
    }
  }, [isError]);

  const showLoadingScreen = loading || isFetching;
  const showErrorScreen = isError;

  if (showErrorScreen) {
    return <>Error</>;
  }

  if (showLoadingScreen) {
    return <>Loading</>;
  }

  return children;
};

export default ProtectedRoute;
