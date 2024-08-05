import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useReducer, useState } from 'react';
import { User } from '@dto/base/User';
import UserContext from '@contexts/UserContext';
import { friendsReducer } from '@reducers/friendsReducer';
import FriendsContext from '@contexts/FriendsContext';

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <FriendsContext.Provider value={{ friends: state.friends, dispatch }}>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </FriendsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
