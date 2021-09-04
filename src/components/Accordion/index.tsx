import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

interface IProps {
  title: string;
  expanding: boolean;
  children: ReactNode;
  onToggleExpand: () => void;
  onExpand?: () => void;
}

export const Accordion = ({
  title,
  expanding,
  children,
  onToggleExpand,
  onExpand,
}: IProps) => {
  const [hiddenOverflow, setHiddenOverflow] = useState<boolean>(true);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const contentRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    const maxHeight = contentRef?.current.scrollHeight;
    maxHeight && setMaxHeight(maxHeight);
  }, []);

  useEffect(() => {
    if (expanding) {
      setTimeout(() => {
        setHiddenOverflow(false);
      }, 500);
    } else {
      setHiddenOverflow(true);
    }
  }, [expanding]);

  useEffect(() => {
    if (maxHeight) {
      contentRef.current.style.maxHeight = expanding ? `${maxHeight}px` : '0';
    }
  }, [maxHeight, expanding]);

  const handleClick = () => {
    onToggleExpand();
    !expanding && onExpand && onExpand();
  };

  return (
    <div
      className={clsx(
        { 'overflow-hidden': hiddenOverflow },
        'rounded-md border border-gray-300 px-2 my-2',
      )}
    >
      <div
        onClick={handleClick}
        className="h-8 flex justify-between items-center cursor-pointer py-1"
      >
        <div className="font-semibold">{title}</div>
        <FontAwesomeIcon
          icon={faChevronRight}
          className={clsx(
            { 'transform -rotate-90': expanding },
            'transition duration-300',
          )}
        />
      </div>
      <div ref={contentRef} className="transition-all duration-500">
        {children}
      </div>
    </div>
  );
};
