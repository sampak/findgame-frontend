import { FC } from 'react';
import SteamButton from '../SteamButton';
import { Props } from './typings';

const LoginMethods: FC<Props> = ({ onClickSteam }) => {
  return <SteamButton onClick={onClickSteam} />;
};

export default LoginMethods;
