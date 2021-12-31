import { useEffect, useState } from 'react';

export const useVisibleWebsite = (): boolean => {
  const [visibleWebsite, setVisibleWebsite] = useState<boolean>(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document[hidden]) {
        setVisibleWebsite(false);
      } else {
        setVisibleWebsite(true);
      }
    };

    let hidden, visibilityChange;
    if (typeof document.hidden !== 'undefined') {
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
      // @ts-ignore
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    handleVisibilityChange();

    document.addEventListener(visibilityChange, handleVisibilityChange);
    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
    };
  }, []);

  return visibleWebsite;
};
