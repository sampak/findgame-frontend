import { FC, Props } from './typings';
import Logo from '../../assets/logo.svg?react';

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="relative bg-white w-1/4 pt-6 pb-6 shadow-md rounded-md px-10 flex flex-col items-center border">
        <div className="absolute bg-lime-200 text-lime-600 px-3 py-0.5 rounded-md right-[24px] top-[12px]">
          BETA
        </div>
        <Logo className="w-1/4 h-auto" />
        <div className="w-full pt-5">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
