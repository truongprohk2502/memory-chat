import { MutableRefObject, useEffect, useState } from 'react';

const useClickOutside = (
  wrapperRef: MutableRefObject<HTMLElement>,
): [boolean, (value: boolean) => void] => {
  const [showWrapperBox, setShowWrapperBox] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowWrapperBox(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return [showWrapperBox, setShowWrapperBox];
};

export default useClickOutside;
