import wheelService from '@api/wheelService';
import AddGamesModal from '@components/AddGamesModal';
import Avatar from '@components/Avatar';
import Button from '@components/Button';
import GameCard from '@components/GameCard';
import LoadingAnimation from '@components/LoadingAnimation';
import { IGame } from '@dto/base/Game';
import { IWheelRoom } from '@dto/base/WheelRoom';
import { WheelEvents } from '@dto/socket/WheelEvents';
import useSocket from '@hooks/useSocket';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
  const { roomId } = useParams();
  const { data: roomData, isLoading } = wheelService.useGet(roomId!);
  const { data: sharedGames } = wheelService.useGetShared(roomId!);
  const [room, setRoom] = useState<IWheelRoom | null>(null);
  const [showAddGame, setShowAddGame] = useState(false);

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

  useEffect(() => {
    if (!roomData) return;
    setRoom(roomData);
  }, [roomData]);

  useEffect(() => {
    if (!roomData) return;
    socket?.emit(WheelEvents.ROOM_JOIN, roomId);
    socket?.on(WheelEvents.ROOM_UPDATE, handleUpdateRoom);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      socket?.off(WheelEvents.ROOM_LEAVE, handleUpdateRoom);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [roomData, socket]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <div className="relative w-full flex items-center justify-end">
        <Button onClick={() => setShowAddGame(!showAddGame)}>Add games</Button>
      </div>
      <div></div>
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Games</div>
        <div className="text-md font-bold text-slate-300 w-full text-center flex flex-wrap gap-2 py-4">
          {/* List is Empty */}
          {room?.games.map((game) => (
            <GameCard game={game} key={game.id} />
          ))}
        </div>
      </div>
      <div className="">
        <div className="text-2xl font-bold">Spectators</div>
        <div className="flex gap-3 flex-wrap pt-5">
          {room?.spectators.map((spectator) => (
            <div className="bg-white shadow-md flex items-center justify-center gap-2 px-2 py-3 rounded-lg">
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
        />
      )}
    </div>
  );
};

export default Room;
