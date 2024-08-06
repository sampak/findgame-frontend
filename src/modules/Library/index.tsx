import { useContext, useEffect, useState } from 'react';
import AppLayout from '@components/AppLayout';
import UserContext from '@contexts/UserContext';
import userService from '@api/userService';
import { User } from '@dto/base/User';
import GameCard from '@components/GameCard';
import SteamButton from '@components/SteamButton';
import steamService from '@api/steamService';
import useWindow from '@hooks/useWindow';
import LoadingAnimation from '@components/LoadingAnimation';

const Library = () => {
  const { data: games, refetch } = userService.useGetMyGames();
  const { mutate: getLink } = steamService.useGetLink();
  const { mutate: getSteamId } = userService.useGetSteamId();
  const { user, setUser } = useContext(UserContext);

  const { createWindow, isClosed } = useWindow();

  const [isLoading, setIsLoading] = useState(false);

  const handleClickSignIn = () => {
    setIsLoading(true);
    getLink(undefined, {
      onSuccess: (response) => {
        createWindow(response);
      },

      onError: () => {
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    if (!isClosed) return;
    refetch();
    getSteamId(undefined, {
      onSuccess: (response) => {
        setUser({ ...(user as User), steamId: response.steamId });
      },
    });
    setIsLoading(false);
  }, [isClosed]);

  return (
    <AppLayout>
      <div className="flex h-full flex-col">
        <div className="text-4xl text-deepNavy-500 font-bold pb-12">
          Library
        </div>
        {!isLoading ? (
          <>
            {user?.steamId ? (
              <div className="h-full flex flex-wrap gap-4 overflow-auto">
                {games?.map((game) => (
                  <GameCard game={game} />
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-5 justify-center h-1/2 flex-col">
                To get games from your profile steam you need to connect
                <div className="w-1/2"></div>
                <SteamButton onClick={handleClickSignIn} />
              </div>
            )}
          </>
        ) : (
          <>
            <LoadingAnimation width={300} height={300} />
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Library;
