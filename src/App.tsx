import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react';
import { User } from './dto/base/User';
import UserContext from './contexts/UserContext';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {

  const [user, setUser] = useState<null | User>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserContext.Provider>
  )
}

export default App
