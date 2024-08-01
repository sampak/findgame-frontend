import { FC, Props } from "./typings";

const Avatar: FC<Props> = ({name}) => {

  const getInitials = (name: string) => {
    try {
      const initials = name.split(' ').map((word) => word.charAt(0).toUpperCase()).join('');
      return initials;
    } catch(e) {
      return '';
    }
  }

  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-deepNavy-400">
      <span className="font-medium text-gray-600 dark:text-gray-300">{getInitials(name)}</span>
    </div>
  )
}

export default Avatar;