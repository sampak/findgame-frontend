import { IGame } from '@dto/base/Game';

export type { FC } from 'react';

export interface Props {
  games: IGame[];
  callback: () => void;
}
