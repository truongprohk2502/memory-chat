import { useEffect, useState } from 'react';

type DimensionType = {
  width: number;
  height: number;
};

function getWindowDimension(): DimensionType {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export const useWindowDimension = (): DimensionType => {
  const [windowDimension, setWindowDimension] = useState<DimensionType>(
    getWindowDimension(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimension(getWindowDimension());
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowDimension;
};
