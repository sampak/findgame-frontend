export type { FC } from 'react';

export interface Props {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  label?: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  type?: 'text' | 'password';
  name?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}
