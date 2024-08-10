import { useState } from 'react';
import { FC, Props } from './typings';

const GameCard: FC<Props> = ({ game }) => {
  const [loadFailed, setLoadFailed] = useState(false);

  const handleClickGame = () => {
    window.location.href = `steam://run/${game.appId}`;
  };

  return (
    <div className="cursor-pointer">
      {!loadFailed && (
        <img
          onClick={handleClickGame}
          className="w-[200px]"
          onError={() => setLoadFailed(true)}
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game?.appId}/header.jpg`}
        />
      )}

      {loadFailed && (
        <div className="w-[200px] h-full bg-gray-500 flex items-center justify-center">
          <div className="text-white text-md">{game.name}</div>
        </div>
      )}
    </div>
  );
};

export default GameCard;
