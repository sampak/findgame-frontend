import steamService from '@api/steamService';
import { setToken } from '@api/user';
import LoadingScreen from '@components/LoadingScreen';
import { useEffect } from 'react';

const VerifySteam = () => {
  const { mutate: verify } = steamService.useVerify();

  const requestUrl = window.location.href;

  const handleCode = () => {
    const params = new URLSearchParams(window.location.search);
    const queryParams = {};
    params.forEach((value, key) => {
      queryParams[key] = value;
    });

    verify(
      {
        requestURL: requestUrl,
        queryParams: queryParams,
      },
      {
        onSuccess: (response) => {
          if (response.token.length) {
            console.log('przypisuje token');
            setToken(response.token);
          }
          window.close();
        },

        onError: () => {},
      }
    );
  };

  useEffect(() => {
    handleCode();
  }, []);

  return <LoadingScreen />;
};

export default VerifySteam;
