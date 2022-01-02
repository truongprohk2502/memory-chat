import clsx from 'clsx';
import { ChangeEventHandler } from 'react';

interface IProps {
  id: string;
  text: string;
  checked: boolean;
  className?: string;
  onChange: ChangeEventHandler;
}

export const Checkbox = ({
  id,
  text,
  checked,
  className = '',
  onChange,
}: IProps) => {
  return (
    <div className="flex items-center mt-1">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={clsx(
          className,
          {
            'checked:bg-blue-500': checked,
          },
          'h-4 w-4 cursor-pointer',
        )}
      />
      <label className="ml-2 cursor-pointer" htmlFor={id}>
        {text}
      </label>
    </div>
  );
};
