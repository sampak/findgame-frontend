import userService from '@api/userService';
import Button from '@components/Button';
import GameCard from '@components/GameCard';
import { IGame } from '@dto/base/Game';

const SelectGames = ({
  selectedGames,
  setSelectedGames,
  handleNextStep,
}: {
  selectedGames: IGame[];
  setSelectedGames: (selectedGames: IGame[]) => void;
  handleNextStep: () => void;
}) => {
  const { data: games } = userService.useGetMyGames();

  const handleClickGame = (game: IGame) => {
    const isExist = selectedGames.find((f) => f.id === game.id);
    if (isExist) {
      setSelectedGames(selectedGames.filter((f) => f.id !== game.id));
      return;
    }

    setSelectedGames([...selectedGames, game]);
  };

  return (
    <>
      <div className="flex gap-4 flex-wrap justify-center h-full overflow-auto">
        {games?.map((game) => {
          return (
            <GameCard
              isSelected={!!selectedGames?.find((g) => g.id === game.id)}
              onClick={() => handleClickGame(game)}
              key={game.id}
              game={game}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-end pt-5">
        <Button onClick={handleNextStep} isDisabled={!selectedGames.length}>
          Next
        </Button>
      </div>
    </>
  );
};

export default SelectGames;
