import LoadingAnimation from '@components/LoadingAnimation';

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen pb-40">
      <LoadingAnimation width={300} height={200} />
      <div className="text-xl font-semibold text-deepNavy-400">
        Loading your games
      </div>
    </div>
  );
};
export default LoadingScreen;
