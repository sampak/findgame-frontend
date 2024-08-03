import userService from '@api/userService';
import AppLayout from '@components/AppLayout';
import DiscoveryCard from '@components/DiscoveryCard';
import LoadingAnimation from '@components/LoadingAnimation';
import useLang from '@hooks/useLang';

const Discovery = () => {
  const { data: users, isLoading } = userService.useGetDiscovery();
  const { getLang } = useLang('discovery');

  return (
    <AppLayout>
      <div className="flex h-full flex-col">
        <div className="text-4xl text-deepNavy-500 font-bold pb-12">
          {getLang('header')}
        </div>
        <div className="flex gap-4 flex-wrap">
          {isLoading && <LoadingAnimation width={200} height={200} />}
          {users?.map((user) => (
            <DiscoveryCard user={user} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Discovery;
