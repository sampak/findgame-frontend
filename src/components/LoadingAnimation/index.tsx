import animationData from '@assets/animations/gamepad.json';
import Lottie from 'react-lottie';
import { FC, Props } from './typings';

const LoadingAnimation: FC<Props> = ({ width, height }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    isPaused: false,
    isStoped: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie
      width={width ?? 200}
      height={height ?? 200}
      isClickToPauseDisabled={true}
      options={defaultOptions}
    />
  );
};

export default LoadingAnimation;
