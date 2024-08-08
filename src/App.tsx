import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useReducer, useState } from 'react';
import { User } from '@dto/base/User';
import UserContext from '@contexts/UserContext';
import { friendsReducer } from '@reducers/friendsReducer';
import FriendsContext from '@contexts/FriendsContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import SocketContext from '@contexts/socket';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [state, dispatch] = useReducer(friendsReducer, { friends: [] });
  const [user, setUser] = useState<null | User>(null);
  const [socket, setSocket] = useState<any>(null);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
      }}
    >
      <UserContext.Provider value={{ user, setUser }}>
        <FriendsContext.Provider value={{ friends: state.friends, dispatch }}>
          <QueryClientProvider client={client}>
            <RouterProvider router={router} />
            <ToastContainer />
          </QueryClientProvider>
        </FriendsContext.Provider>
      </UserContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
