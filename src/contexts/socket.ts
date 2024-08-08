import { createContext } from 'react';

type IAuthContext = {
  socket: any;
  setSocket: (socket: any) => void;
};

const SocketContext = createContext<IAuthContext>({
  socket: null,
  setSocket: () => {},
});

export default SocketContext;
 