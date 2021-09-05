import clsx from 'clsx';

interface IProps {
  text: string;
  variant?: 'success' | 'normal' | 'warning';
}

export const Badge = ({ text, variant = 'normal' }: IProps) => {
  return (
    <span
      className={clsx(
        { 'bg-green-500': variant === 'success' },
        { 'bg-gray-500': variant === 'normal' },
        { 'bg-yellow-500': variant === 'warning' },
        'px-2 pb-0.5 text-white text-sm w-auto rounded-full font-bold',
      )}
    >
      {text}
    </span>
  );
};
