import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

interface IProps {
  title: string;
  children: ReactNode;
}

export const Accordion = ({ title, children }: IProps) => {
  const [expanding, setExpanding] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const contentRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    const maxHeight = contentRef?.current.scrollHeight;
    maxHeight && setMaxHeight(maxHeight);
  }, []);

  useEffect(() => {
    if (maxHeight) {
      contentRef.current.style.maxHeight = expanding ? `${maxHeight}px` : '0';
    }
  }, [maxHeight, expanding]);

  return (
    <div className="rounded-md overflow-hidden border border-gray-300 px-2">
      <div
        onClick={() => setExpanding(!expanding)}
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
