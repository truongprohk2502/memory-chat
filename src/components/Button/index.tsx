import { ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  variant: 'circle';
  color: 'light';
  icon?: ReactNode;
  className?: string;
}

export const Button = ({
  type = 'button',
  variant,
  color,
  icon,
  className = '',
}: IProps) => {
  return (
    <button
      type={type}
      className={clsx(
        className,
        { 'w-10 rounded-full': variant === 'circle' },
        { 'bg-gray-200 hover:bg-gray-300': color === 'light' },
        'h-10 transition duration-300',
      )}
    >
      {icon}
    </button>
  );
};
