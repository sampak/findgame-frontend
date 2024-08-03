import classNames from 'classnames';
import { FC, Props } from './typings';
import CompassIcon from '@assets/icons/compass.svg?react';
import DiscoveryIcon from '@assets/icons/discovery.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';

const Menu: FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // bg-deepNavy-500
  // fill-white

  return (
    <div className="w-[150px] h-full bg-white rounded-r-xl shadow-lg">
      <div className="w-full mt-40 flex items-center flex-col gap-8">
        <div
          onClick={() => navigate('/')}
          className={classNames(
            ' w-[48px] h-[48px] rounded-xl flex items-center justify-center cursor-pointer group hover:bg-deepNavy-500',
            { 'bg-deepNavy-500': isActive('/') }
          )}
        >
          <CompassIcon
            className={classNames('group-hover:fill-white', {
              'fill-white': isActive('/'),
            })}
          />
        </div>

        <div
          onClick={() => navigate('/discovery')}
          className={classNames(
            ' w-[48px] h-[48px] rounded-xl flex items-center justify-center cursor-pointer group hover:bg-deepNavy-500',
            { 'bg-deepNavy-500': isActive('/discovery') }
          )}
        >
          <DiscoveryIcon
            className={classNames('group-hover:fill-white', {
              'fill-white': isActive('/discovery'),
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
