import { ReactNode, useRef } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import useClickOutside from 'hooks/useClickOutside';

interface IOption {
  icon: IconDefinition;
  iconColorTailwind: string;
  i18nLabelPath: string;
  onClick: () => void;
}

interface IProps {
  children: ReactNode;
  options: IOption[];
}

export const Dropdown = ({ children, options }: IProps) => {
  const { t } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [showSelectBox, setShowSelectBox] = useClickOutside(wrapperRef);

  const handleClick = () => {
    !showSelectBox && setShowSelectBox(true);
  };

  return (
    <div className="relative">
      <div onClick={handleClick}>{children}</div>
      <div
        ref={wrapperRef}
        className={clsx(
          { hidden: !showSelectBox },
          'absolute right-0 top-beyond-full bg-white shadow-lg z-10 rounded-md dark:bg-gray-700',
        )}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className="flex whitespace-nowrap py-1 px-4 cursor-pointer transition duration-150 hover:bg-gray-200 first:rounded-t-md last:rounded-b-md dark:bg-gray-700 dark:hover:bg-gray-500"
            onClick={option.onClick}
          >
            <div
              className={`bg-gray-300 dark:bg-gray-400 rounded-full w-7 h-7 flex justify-center items-center ${option.iconColorTailwind}`}
            >
              <FontAwesomeIcon icon={option.icon} />
            </div>
            <span className="ml-3 dark:text-white">
              {t(option.i18nLabelPath)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
