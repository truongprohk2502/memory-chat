import { useEffect, useRef, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface IOption {
  value: string;
  i18nLabelPath?: string;
  label?: string;
}

interface IProps {
  value: string;
  options: IOption[];
  usingI18n?: boolean;
  isFullWidth?: boolean;
  hasBorder?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
}

export const Select = ({
  value,
  options,
  usingI18n,
  isFullWidth,
  hasBorder,
  disabled,
  className = '',
  onChange,
}: IProps) => {
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
    <div className={`relative ${className}`}>
      <button
        onClick={handleClick}
        className={clsx(
          { 'w-full text-left pl-4': isFullWidth },
          { 'border border-gray-400': hasBorder },
          'whitespace-nowrap overflow-hidden overflow-ellipsis py-1 pl-2 pr-6 disabled:bg-gray-100 disabled:text-gray-300 bg-gray-200 rounded-md dark:bg-gray-700',
        )}
        disabled={disabled}
      >
        {selectedOption
          ? usingI18n
            ? t(selectedOption.i18nLabelPath)
            : selectedOption.label
          : ''}
      </button>
      <div className="absolute inset-y-0 right-2 flex items-center text-xs">
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <div
        ref={wrapperRef}
        className={clsx(
          { hidden: !showSelectBox },
          { 'w-full': isFullWidth },
          'absolute right-0 top-beyond-full bg-white shadow-lg z-10 rounded-md dark:bg-gray-700',
        )}
      >
        {options.map(option => (
          <div
            key={option.value}
            className="whitespace-nowrap overflow-hidden overflow-ellipsis py-1 px-4 cursor-pointer transition duration-150 hover:bg-gray-200 first:rounded-t-md last:rounded-b-md dark:bg-gray-700 dark:hover:bg-gray-500"
            onClick={() => handleChange(option.value)}
          >
            {usingI18n ? t(option.i18nLabelPath) : option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
