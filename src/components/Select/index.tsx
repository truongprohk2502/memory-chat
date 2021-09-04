import { useEffect, useRef, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface IProps {
  value: string;
  options: Array<{ value: string; i18nLabelPath: string }>;
  onChange: (value: string) => void;
}

export const Select = ({ value, options, onChange }: IProps) => {
  const [showSelectBox, setShowSelectBox] = useState<boolean>(false);

  const { t } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = e => {
      if (wrapperRef && !wrapperRef.current.contains(e.target)) {
        setShowSelectBox(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    !showSelectBox && setShowSelectBox(true);
  };

  const handleChange = (changeValue: string) => {
    if (value !== changeValue) {
      onChange(changeValue);
    }
    setShowSelectBox(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="py-1 pl-2 pr-6 bg-gray-200 rounded-md dark:bg-gray-700"
      >
        {selectedOption ? t(selectedOption.i18nLabelPath) : ''}
      </button>
      <div className="absolute inset-y-0 right-2 flex items-center text-xs">
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <div
        ref={wrapperRef}
        className={clsx(
          { hidden: !showSelectBox },
          'absolute right-0 top-beyond-full bg-white shadow-lg z-10 rounded-md dark:bg-gray-700',
        )}
      >
        {options.map(option => (
          <div
            key={option.value}
            className="whitespace-nowrap py-1 px-4 cursor-pointer transition duration-150 hover:bg-gray-200 first:rounded-t-md last:rounded-b-md dark:bg-gray-700 dark:hover:bg-gray-500"
            onClick={() => handleChange(option.value)}
          >
            {t(option.i18nLabelPath)}
          </div>
        ))}
      </div>
    </div>
  );
};