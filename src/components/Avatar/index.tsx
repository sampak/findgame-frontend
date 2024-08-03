import classNames from 'classnames';
import { FC, Props } from './typings';

const Avatar: FC<Props> = ({ user, className }) => {
  const getInitials = (name: string) => {
    try {
      const initials = name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
      return initials;
    } catch (e) {
      return '';
    }
  };

  return (
    <div
      className={classNames(
        'relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-deepNavy-400',
        className
      )}
    >
      {!user?.avatar && (
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {getInitials(user?.login ?? '')}
        </span>
      )}
      {user?.avatar && <img src={user.avatar} />}
    </div>
  );
};

export default Avatar;
