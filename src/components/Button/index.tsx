import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'circle' | 'normal';
  color?: 'light' | 'primary' | 'danger';
  size?: 'xs' | 'sm' | 'md';
  isFileButton?: boolean;
  icon?: IconDefinition;
  iconColorClassName?: string;
  text?: string;
  hasOnlyButton?: boolean;
  hasPingBadge?: boolean;
  isActive?: boolean;
  disabled?: boolean;
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
}

export const Button = ({
  id,
  type = 'button',
  variant = 'normal',
  color = 'light',
  size = 'md',
  isFileButton = false,
  icon,
  iconColorClassName = '',
  text = '',
  hasOnlyButton = true,
  hasPingBadge = false,
  isActive = false,
  disabled = false,
  hasTooltip = false,
  tooltipName = '',
  tooltipPlacement = 'right',
  containerClassName = '',
  buttonClassName = '',
  onClick,
  ...props
}: IProps) => {
  const renderButton = isFileButton ? (
    <>
      <label
        htmlFor={id}
        className={clsx(
          buttonClassName,
          { 'w-5': variant === 'circle' && size === 'xs' },
          { 'w-8': variant === 'circle' && size === 'sm' },
          { 'w-10': variant === 'circle' && size === 'md' },
          { 'rounded-full': variant === 'circle' },
          { 'rounded-md': variant === 'normal' },
          {
            'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-500 dark:text-white':
              color === 'light' && !isActive,
          },
          {
            'bg-blue-500 hover:bg-blue-600 text-white':
              color === 'light' && isActive,
          },
          { 'text-white': color === 'primary' },
          { 'bg-blue-500 hover:bg-blue-400': color === 'primary' && !disabled },
          { 'bg-blue-300 cursor-default': color === 'primary' && disabled },
          {
            'bg-red-500 hover:bg-red-400 text-white':
              color === 'danger' && !disabled,
          },
          { 'bg-red-300 cursor-default': color === 'danger' && disabled },
          { 'h-5 px-1': size === 'xs' },
          { 'h-8 px-2': size === 'sm' },
          { 'h-10 px-2': size === 'md' },
          'transition duration-300 flex justify-center items-center cursor-pointer',
        )}
      >
        {icon && <FontAwesomeIcon icon={icon} className={iconColorClassName} />}
        {text && <span className="pl-1">{text}</span>}
      </label>
      <input type="file" id={id} className="hidden" />
    </>
  ) : (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        buttonClassName,
        { 'w-5': variant === 'circle' && size === 'sm' },
        { 'w-8': variant === 'circle' && size === 'sm' },
        { 'w-10': variant === 'circle' && size === 'md' },
        { 'rounded-full': variant === 'circle' },
        { 'rounded-md': variant === 'normal' },
        {
          'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-500 dark:text-white':
            color === 'light' && !isActive,
        },
        {
          'bg-blue-500 hover:bg-blue-600 text-white':
            color === 'light' && isActive,
        },
        { 'text-white': color === 'primary' },
        { 'bg-blue-500 hover:bg-blue-400': color === 'primary' && !disabled },
        { 'bg-blue-300 cursor-default': color === 'primary' && disabled },
        {
          'bg-red-500 hover:bg-red-400 text-white':
            color === 'danger' && !disabled,
        },
        { 'bg-red-300 cursor-default': color === 'danger' && disabled },
        { 'h-5 px-1': size === 'xs' },
        { 'h-8 px-2': size === 'sm' },
        { 'h-10 px-2': size === 'md' },
        'transition duration-300 flex justify-center items-center',
      )}
      {...props}
    >
      {icon && <FontAwesomeIcon icon={icon} className={iconColorClassName} />}
      {text && <span className={icon ? 'pl-1' : ''}>{text}</span>}
    </button>
  );

  return hasOnlyButton ? (
    renderButton
  ) : (
    <div className={clsx(containerClassName, 'relative group')}>
      {renderButton}
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
