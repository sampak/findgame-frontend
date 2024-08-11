import { IGame } from './Game';
import { User } from './User';

export interface IWheelRoom {
  id: string;
  users: User[];
  games: IGame[];
  spectators: User[];
  creator: User;
}
