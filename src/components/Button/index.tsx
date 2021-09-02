import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  variant: 'circle';
  color: 'light';
  icon?: IconDefinition;
  hasPingBadge?: boolean;
  isActive?: boolean;
  hasTooltip?: boolean;
  tooltipName?: string;
  tooltipPlacement?:
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  containerClassName?: string;
  buttonClassName?: string;
  onClick: () => void;
}

export const Button = ({
  type = 'button',
  variant,
  color,
  icon,
  hasPingBadge = false,
  isActive = false,
  hasTooltip = false,
  tooltipName = '',
  tooltipPlacement = 'right',
  containerClassName = '',
  buttonClassName = '',
  onClick,
}: IProps) => {
  return (
    <div className={clsx(containerClassName, 'relative group')}>
      <button
        type={type}
        onClick={onClick}
        className={clsx(
          buttonClassName,
          { 'w-10 rounded-full': variant === 'circle' },
          {
            'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-500 dark:text-white':
              color === 'light' && !isActive,
          },
          {
            'bg-blue-500 hover:bg-blue-600 text-white':
              color === 'light' && isActive,
          },
          'h-10 transition duration-300',
        )}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
      {hasTooltip && (
        <div
          className={clsx(
            { 'top-0 bottom-0 right-full pr-1': tooltipPlacement === 'left' },
            { 'top-0 bottom-0 left-full pl-1': tooltipPlacement === 'right' },
            { 'bottom-full right-0 pb-1': tooltipPlacement === 'top-left' },
            { 'bottom-full left-0 pb-1': tooltipPlacement === 'top-right' },
            { 'top-full right-0 pt-1': tooltipPlacement === 'bottom-left' },
            { 'top-full left-0 pt-1': tooltipPlacement === 'bottom-right' },
            'absolute z-10 whitespace-nowrap items-center hidden group-hover:flex',
          )}
        >
          <div className="py-1 px-3 rounded-md bg-gray-800 text-white">
            {tooltipName}
          </div>
        </div>
      )}
      {hasPingBadge && (
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-full w-full bg-red-500"></span>
        </span>
      )}
    </div>
  );
};
