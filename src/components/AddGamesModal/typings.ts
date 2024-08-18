import { IGame } from '@dto/base/Game';

export type { FC } from 'react';

export interface Props {
  sharedGames: IGame[];
  addedGames: IGame[];
  toggle: () => void;
  onAccept: (games: IGame[]) => void;
}
