import Avatar from '@components/Avatar';
import { FC, Props } from './typings';
import Progress from 'react-circle-progress-bar';
import styles from './styles.module.scss';
import classNames from 'classnames';
import useLang from '@hooks/useLang';

const DiscoveryCard: FC<Props> = ({ user }) => {
  const { getLang } = useLang('discoveryCard');

  const getClass = () => {
    const score = Math.floor(user.score);

    if (score >= 75) {
      return styles.big;
    }

    if (score <= 25) {
      return styles.small;
    }
  };

  return (
    <div className=" overflow-hidden flex flex-col items-center justify-center py-6 pb-0 w-fit bg-white border rounded-md shadow-md">
      <div className="flex flex-col px-12">
        <Avatar className="w-[84px] h-[84px]" user={user} />
        <div className="pt-2 pb-2 font-bold text-2xl">{user.login}</div>

        <div>
          <div className="flex flex-col pt-1 items-center justify-center ml-[-7px]">
            <Progress
              progress={user.score}
              hideValue
              className={classNames('w-[26px]', styles.circleStyle, getClass())}
            />
            <div className="text-md pt-1 text-black font-semibold">
              {Math.floor(user.score)}%
            </div>
            <div className="text-sm text-black font-semibold">
              {getLang('score')}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-2 items-center border-t-2 w-full pt-3 pb-3 hover:bg-deepNavy-50 cursor-pointer select-none">
        {getLang('add')}
      </div>
    </div>
  );
};

export default DiscoveryCard;
