import { FriendList } from '../FriendList';
import Menu from '../Menu';
import Topbar from '../Topbar';
import { FC, Props } from './typings';

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <div className='relative flex h-screen w-screen'>
      <Menu />
      
        <Topbar />
        <div className='flex w-full h-full pt-28 pl-12 pr-12 gap-10 pb-6'>
          <div className='w-3/4'>{children}</div>
          <div className='w-1/4 bg-white rounded-xl shadow-lg'><FriendList /></div>
        </div>
   
    </div>
    // <div className="flex h-screen">
    //   <Menu />
    //   <div className="w-full h-full px-12">
    //     <Topbar />
    //     <div className='flex flex-row gap-4  h-4/6 pt-12'>
    //       <div className='w-full h-full'>{children}</div>
    //       <div className='w-1/4 h-full bg-white rounded-xl shadow-lg'>
    //         <FriendList />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AppLayout;
