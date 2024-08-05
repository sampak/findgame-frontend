import { createContext } from 'react';
import { IFriend } from '@dto/base/Friend';
import { FriendsAction } from '@reducers/friendsReducer';

type IFriendsContext = {
  friends: IFriend[];
  dispatch: React.Dispatch<FriendsAction>;
};

const FriendsContext = createContext<IFriendsContext>({
  friends: [],
  dispatch: () => {},
});

export default FriendsContext;
