import { useContext } from 'react';
import SocketContext from '@contexts/socket';
import { io } from 'socket.io-client';

const useSocket = () => {
  const { socket, setSocket } = useContext(SocketContext);

  const connect = (token: string) => {
    if (socket) return;
    const sock = io(`ws://127.0.0.1:5000`, {
      query: { token: token },
    });

    setSocket(sock);
    sock.on('connect', () => {
      console.log('connected to socket:', sock?.id);
    });

    sock.on('disconnect', () => {
      console.log('disconnected: ', sock?.id);
      setSocket(null);
    });
    sock.on('connect_error', (error) => {
      console.log('SOCKET CONNECTION ERROR', error);
    });
  };

  const disconnect = () => {
    if (socket) {
      console.log('trying disconnect');
      socket.close();
    }
  };

  return { socket, connect, disconnect };
};

export default useSocket;
