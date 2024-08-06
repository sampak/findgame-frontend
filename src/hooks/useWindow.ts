import { useEffect, useState } from 'react';

const useWindow = () => {
  const [currentWindow, setCurrentWindow] = useState<Window | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  const createWindow = (link: string) => {
    setIsClosed(false);
    const newWindow = window.open(link, 'window', 'height=800,width=700');
    setCurrentWindow(newWindow);
  };

  useEffect(() => {
    if (!currentWindow) return;
    if (timer) {
      clearInterval(timer);
    }

    const newTimer = setInterval(() => {
      if (!currentWindow.closed) return;

      clearInterval(newTimer);
      setIsClosed(true);
    }, 1000);

    setTimer(newTimer);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [currentWindow]);

  return {
    isClosed,
    createWindow,
  };
};

export default useWindow;
