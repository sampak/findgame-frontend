import React, { useEffect, useState, useRef, FC } from 'react';
import GameCard from '@components/GameCard';
import styles from './styles.module.scss';
import { Props } from './typings';

const WheelRoll: FC<Props> = ({ games, callback }) => {
  const [winningGameIndex, setWinningGameIndex] = useState<number | null>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [rotateCard, setRotateCard] = useState(false);
  const wheelRef = useRef(null);
  const cardWidth = 200;
  const animationDuration = 5;
  const ref = useRef<HTMLDivElement>(null);
  const [randomOffset, setRandomOffset] = useState<number>(0);

  useEffect(() => {
    setAnimationStarted(false);
    setRotateCard(false);
    setTimeout(() => {
      const winnerIndex = games.findIndex((game) => game.isWinned);
      setWinningGameIndex(winnerIndex);

      if (winnerIndex !== -1) {
        setTimeout(() => {
          setAnimationStarted(true);
          const offset = Math.random() * cardWidth - cardWidth / 2;
          setRandomOffset(offset);
        }, 100);
      }
    }, 500);
  }, [games]);

  const calculateWinningPosition = () => {
    if (!ref?.current) return 0;
    if (winningGameIndex !== null) {
      const position = ref.current.getBoundingClientRect();
      const totalDistance = winningGameIndex * cardWidth;
      return -totalDistance + position.width / 2 - cardWidth / 2 + randomOffset;
    }
    return 0;
  };

  useEffect(() => {
    if (animationStarted) {
      setTimeout(() => {
        setRotateCard(true);
        setTimeout(() => {
          callback();
        }, 1000);
      }, animationDuration * 1000);
    }
  }, [animationStarted]);

  return (
    <div ref={ref} className="w-full relative overflow-hidden h-[93px]">
      <div
        className={`absolute flex transition-transform ${
          animationStarted ? 'transform ease-out' : ''
        }`}
        style={{
          transform: animationStarted
            ? `translateX(${calculateWinningPosition()}px)`
            : 'translateX(0)',
          transitionDuration: `${animationDuration}s`,
        }}
        ref={wheelRef}
      >
        {games.map((game, index) => (
          <div
            className={`w-[200px] ${
              index === winningGameIndex && rotateCard
                ? `${styles.rotate3d} ${styles.rotate3dActive}`
                : `${styles.rotate3d}`
            }`}
            key={index}
          >
            <GameCard game={game} onClick={() => {}} />
          </div>
        ))}
      </div>
      <div className="absolute z-10 w-[3px] h-full bg-deepNavy-500 left-[50%]"></div>
    </div>
  );
};

export default WheelRoll;
