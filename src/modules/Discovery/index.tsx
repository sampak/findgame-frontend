import { useContext, useState } from 'react';
import AppLayout from '../../components/AppLayout';
import DiscoveryCard from '../../components/DiscoveryCard';
import UserContext from '../../contexts/UserContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
// import steamService from '../../api/steamService';
import userService from '../../api/userService';
import { User } from '../../dto/base/User';
import gameService from '../../api/gameService';

const Discovery = () => {
  const [steamId, setSteamId] = useState('');
  const { data: games, refetch } = userService.useGetMyGames();
  // const { mutate: getSteamId } = steamService.useGetSteamId();
  const { mutate: updateSteamId } = userService.useUpdateSteamId();
  const { mutate: getSteamGames } = gameService.useGetSteamGames();
  const { user, setUser } = useContext(UserContext);

  console.log(games);

  const handleSaveSteamId = () => {
    getSteamGames({
      steamName: steamId
    }, {
      onSuccess: (response) => {
        console.log(response);
        updateSteamId({  
          steamId: response.steamId
        }, {
          onSuccess: () => {
            setUser({...user as User, steamId: response.steamId});
            refetch();
          }
        })
      }
    })
  }

  return (
    <AppLayout>
      <div className='flex h-full flex-col'>
        <div className="text-4xl text-deepNavy-500 font-bold pb-12">
          Discovery
        </div>
        {
        user?.steamId ? <div className="h-full flex flex-wrap gap-4 overflow-auto">
          {games?.map(game => 
            <DiscoveryCard game={game} />

          )}
        </div>
        : <div className='flex items-center gap-5 justify-center h-1/2 flex-col'>
          To get your games you need to provide url or username from steam
          <div className='w-1/2'>

            <Input onChange={(t) => setSteamId(t)} value={steamId} placeholder='Provide url or steam name'  />
          </div>
          <Button onClick={handleSaveSteamId}>Save</Button>
          
          </div>}
      </div>
    </AppLayout>
  );
};

export default Discovery;
