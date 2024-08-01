export type { FC } from 'react';

export interface Props {
  children: string | JSX.Element;
  type?: 'button' | 'submit';
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}