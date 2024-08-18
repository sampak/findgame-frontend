import { IFriend } from '@dto/base/Friend';

export type { FC } from 'react';

export interface Props {
  friend: IFriend;
  onClick: (friend: IFriend) => void;
  isSelected: boolean;
}
