import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

interface IProps {
  icon: IconDefinition;
  text: string;
  isSelected: boolean;
  className?: string;
  onClick: () => void;
}

export const SettingCard = ({
  icon,
  text,
  isSelected,
  className = '',
  onClick,
}: IProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        { 'hover:bg-blue-400': !isSelected },
        { 'bg-blue-500': isSelected },
        `flex rounded-md group cursor-pointer transition duration-150 ${className}`,
      )}
    >
      <div className="w-10">
        <div
          className={clsx(
            { 'bg-blue-300 group-hover:bg-blue-400': !isSelected },
            'w-8 h-8 rounded-lg flex justify-center items-center',
          )}
        >
          <FontAwesomeIcon
            icon={icon}
            className={clsx(
              { 'text-blue-500 group-hover:text-white': !isSelected },
              { 'text-white': isSelected },
              'transition duration-150',
            )}
          />
        </div>
      </div>
      <div
        className={clsx(
          { 'group-hover:text-white': !isSelected },
          { 'text-white': isSelected },
          'flex-auto flex items-center transition duration-150',
        )}
      >
        {text}
      </div>
    </div>
  );
};
