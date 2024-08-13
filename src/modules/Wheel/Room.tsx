import wheelService from '@api/wheelService';
import AddGamesModal from '@components/AddGamesModal';
import Avatar from '@components/Avatar';
import Button from '@components/Button';
import GameCard from '@components/GameCard';
import LoadingAnimation from '@components/LoadingAnimation';
import WheelRoll from '@components/WheelRoll';
import UserContext from '@contexts/UserContext';
import { IGame } from '@dto/base/Game';
import { IWheelRoom } from '@dto/base/WheelRoom';
import { WheelEvents } from '@dto/socket/WheelEvents';
import useSocket from '@hooks/useSocket';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
  const { roomId } = useParams();
  const { user } = useContext(UserContext);
  const { data: roomData, isLoading } = wheelService.useGet(roomId!);
  const { data: sharedGames } = wheelService.useGetShared(roomId!);
  const [room, setRoom] = useState<IWheelRoom | null>(null);
  const [showAddGame, setShowAddGame] = useState(false);
  const [showRoll, setShowRoll] = useState(false);
  const [startRoll, setStartRoll] = useState(false);
  const [gamesToRoll, setGamesToRoll] = useState<IGame[]>([]);

  const { socket } = useSocket();

  const handleBeforeUnload = () => socket?.emit(WheelEvents.ROOM_LEAVE, roomId);
  const handleUpdateRoom = (data: IWheelRoom) => setRoom(data);

  const handleAddGamesToRoom = (games: IGame[]) => {
    socket.emit(WheelEvents.ROOM_INSERT_GAMES, {
      roomId,
      games: games.map((g) => g.id),
    });
    setShowAddGame(false);
  };

  const handleRemoveGameFromRoom = (game: IGame) => {
    socket.emit(WheelEvents.ROOM_REMOVE_GAMES, {
      roomId,
      games: [game.id],
    });
  };

  const handleStartRoll = (data) => {
    setStartRoll(false);
    setShowRoll(false);
    setTimeout(() => {
      setStartRoll(true);
      setShowRoll(true);
      setGamesToRoll(data);
    }, 100);
  };

  useEffect(() => {
    if (!roomData) return;
    setRoom(roomData);
  }, [roomData]);

  useEffect(() => {
    if (!roomData) return;
    socket?.emit(WheelEvents.ROOM_JOIN, roomId);
    socket?.on(WheelEvents.ROOM_UPDATE, handleUpdateRoom);
    socket?.on('ROOM_ROLL', handleStartRoll);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      socket?.off('ROOM_ROLL', handleStartRoll);
      socket?.off(WheelEvents.ROOM_LEAVE, handleUpdateRoom);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [roomData, socket]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <div></div>
      <div className="flex flex-col">
        <div className="h-[90px] mb-10">
          <div
            style={{
              transition: 'height 1s',
              height: showRoll ? '92px' : '0px',
            }}
            className={`overflow-hidden`}
          >
            {showRoll && (
              <WheelRoll
                games={gamesToRoll}
                callback={() => {
                  setStartRoll(false);
                }}
              />
            )}
          </div>
        </div>
        {user?.id === room?.creator.id && (
          <div className="flex justify-center items-center">
            <Button
              onClick={() => socket.emit('ROOM_ROLL', roomId)}
              isDisabled={
                startRoll ||
                (room?.games?.length ?? 0) <= 1 ||
                (room?.games?.length ?? 0) >= 100
              }
            >
              Start Wheel
            </Button>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Games</div>
          <div className="">
            <Button onClick={() => setShowAddGame(!showAddGame)}>
              Add games
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-2 py-4">
          {!room?.games?.length && (
            <div className="w-full  text-center ">
              <div className="text-md font-bold">List is Empty</div>
              <div>click `Add games` button to add games to list</div>
            </div>
          )}
          {room?.games.map((game) => (
            <GameCard
              onClick={() => handleRemoveGameFromRoom(game)}
              game={game}
              key={game.id}
            />
          ))}
        </div>
      </div>
      <div className="">
        <div className="text-2xl font-bold">Spectators</div>
        <div className="flex gap-3 flex-wrap pt-5">
          {room?.spectators.map((spectator) => (
            <div className="bg-white shadow-md flex items-center justify-center gap-2 px-5 py-3 rounded-lg">
              <Avatar user={spectator} />
              <div className="font-semibold">{spectator.login}</div>
            </div>
          ))}
        </div>
      </div>
      {showAddGame && (
        <AddGamesModal
          onAccept={handleAddGamesToRoom}
          toggle={() => setShowAddGame(false)}
          sharedGames={sharedGames ?? []}
          addedGames={room?.games ?? []}
        />
      )}
    </div>
  );
};

export default Room;
