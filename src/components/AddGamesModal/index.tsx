import userService from '@api/userService';
import Button from '@components/Button';
import GameCard from '@components/GameCard';
import CloseIcon from '@assets/icons/close.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';
import Input from '@components/Input';
import { useEffect, useState } from 'react';
import { IGame } from '@dto/base/Game';
import { FC, Props } from './typings';

const AddGamesModal: FC<Props> = ({
  sharedGames,
  addedGames,
  toggle,
  onAccept,
}) => {
  const { data: games } = userService.useGetMyGames();

  const [searchValue, setSearchValue] = useState('');
  const [searchedGames, setSearchedGames] = useState<IGame[]>([]);
  const [onlyShared, setOnlyShared] = useState(false);
  const [selectedGames, setSelectedGames] = useState<IGame[]>([]);

  console.log(onlyShared);

  const handleClickGame = (game: IGame) => {
    const isExist = selectedGames.find((f) => f.id === game.id);
    if (isExist) {
      setSelectedGames(selectedGames.filter((f) => f.id !== game.id));
      return;
    }

    setSelectedGames([...selectedGames, game]);
  };

  useEffect(() => {
    let allGames = onlyShared ? sharedGames : games;

    if (searchValue.length) {
      allGames = allGames.filter(
        (g) =>
          g.name.toLocaleLowerCase().search(searchValue.toLocaleLowerCase()) !==
          -1
      );
    }
    setSearchedGames(
      allGames?.filter((g) => !addedGames.find((gg) => gg.id === g.id))
    );
  }, [games, searchValue, onlyShared]);

  return (
    <div className="absolute w-2/3 h-2/3 z-20 bg-white shadow-xl rounded-xl left-[50%] transform -translate-x-[50%] top-[50%] transform -translate-y-[50%]">
      <div className="h-full relative flex flex-col px-8 py-4">
        <div className="text-2xl text-deepNavy-500 font-bold pb-4 flex items-center justify-between">
          <div>Select games</div>
          <div className="cursor-pointer hover:bg-deepNavy-300 group rounded-sm">
            <CloseIcon onClick={toggle} className="group-hover:fill-white" />
          </div>
        </div>
        <div className="flex items-center justify-center pb-4">
          <div className="w-2/3">
            <Input
              onChange={(t) => {
                setSearchValue(t);
              }}
              placeholder="Search game"
              Icon={SearchIcon}
              value={searchValue}
            />
          </div>
        </div>
        <div className="h-full flex flex-wrap gap-4 overflow-auto h-full justify-center">
          {searchedGames?.map((game) => (
            <GameCard
              game={game}
              onClick={() => handleClickGame(game)}
              isSelected={!!selectedGames.find((g) => g.id === game.id)}
              key={game.id}
            />
          ))}
        </div>
        <div className="pt-2 flex items-center justify-end gap-2 font-semibold">
          <input
            checked={onlyShared}
            onChange={() => setOnlyShared(!onlyShared)}
            type="checkbox"
          />
          Show only shared games
        </div>
        <div className="flex items-center justify-center pt-5">
          <Button onClick={() => onAccept(selectedGames)}>
            <>Add {selectedGames.length.toString()} games</>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddGamesModal;
