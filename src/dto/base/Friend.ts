import { FriendStatus } from './FriendStatus';
import { User } from './User';

export interface IFriend {
  id: string;
  user: User;
  status: FriendStatus;
  myInvitation: boolean;
  isOnline?: boolean;
}
