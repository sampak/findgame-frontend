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
            setToken(response.token);
          }
          window.close();
        },

        onError: () => {},
      }
    );
  };

  useEffect(() => {
    const t = setTimeout(() => {
      handleCode();
    }, 100);

    return () => clearTimeout(t);
  }, []);

  return <LoadingScreen />;
};

export default VerifySteam;
