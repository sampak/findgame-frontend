import { useState } from 'react';
import { FC, Props } from './typings';

const GameCard: FC<Props> = ({ game, onClick, isSelected = false }) => {
  const [loadFailed, setLoadFailed] = useState(false);

  const handleClickGame = () => {
    if (onClick) {
      onClick();
      return;
    }
    window.location.href = `steam://run/${game.appId}`;
  };

  return (
    <div
      className={`h-fit w-fit cursor-pointer relative border-2 ${
        isSelected && 'border-lightSky-700'
      }`}
    >
      {!loadFailed && (
        <img
          onClick={handleClickGame}
          className="w-[200px]"
          onError={() => setLoadFailed(true)}
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game?.appId}/header.jpg`}
        />
      )}

      {loadFailed && (
        <div
          onClick={handleClickGame}
          className="w-[200px] min-h-[94px] h-full bg-gray-500 flex items-center justify-center"
        >
          <div className="text-white text-md">{game.name}</div>
        </div>
      )}
    </div>
  );
};

export default GameCard;
