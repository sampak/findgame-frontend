export type { FC } from 'react';

export interface Props {
  children: string | JSX.Element;
  className?: string;
  onClick: () => void
}