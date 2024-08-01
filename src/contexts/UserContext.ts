import { createContext } from 'react';
import { User } from '../dto/base/User';

type IUserContext = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export default UserContext;
