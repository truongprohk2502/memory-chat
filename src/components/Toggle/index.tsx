import clsx from 'clsx';
import { useState } from 'react';

interface IProps {
  checked: boolean;
  disabled?: boolean;
  tooltip?: string;
  onChange: () => void;
}

export const Toggle = ({
  checked,
  disabled = false,
  tooltip,
  onChange,
}: IProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleCheck = () => {
    !disabled && onChange();
  };

  const handleMouseEnter = () => {
    tooltip && setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    tooltip && setShowTooltip(false);
  };

  return (
    <div
      className={clsx(
        { 'bg-blue-500': checked && !disabled },
        { 'bg-blue-300': checked && disabled },
        { 'bg-gray-400': !checked && !disabled },
        { 'bg-gray-300': !checked && disabled },
        { 'cursor-pointer': !disabled },
        'relative w-9 h-5 transition-all duration-500 rounded-full',
      )}
      onClick={handleCheck}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={clsx(
          { 'translate-x-5': checked },
          'w-3 h-3 rounded-full bg-white absolute transform duration-300 translate-x-1 inset-y-1',
        )}
      />
      {tooltip && showTooltip && (
        <div
          className={clsx(
            { hidden: !showTooltip },
            'rounded-md px-1 bg-red-500 text-white whitespace-nowrap absolute top-beyond-full right-0 text-xs z-10',
          )}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};
