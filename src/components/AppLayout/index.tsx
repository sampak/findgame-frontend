import { FriendList } from '../FriendList';
import Menu from '../Menu';
import Topbar from '../Topbar';
import { FC, Props } from './typings';

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <div className="relative flex h-screen w-screen">
      <Menu />
      <Topbar />
      <div className="flex w-full h-full pt-28 pl-12 pr-12 gap-10 pb-6">
        <div className="w-4/5">{children}</div>
        <div className="w-1/5 bg-white rounded-xl shadow-lg">
          <FriendList />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
