import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

interface IProps {
  className?: string;
  icon: IconDefinition;
  label: string;
  isActive: boolean;
  count?: number;
  onClick: () => void;
}

const RadioOption = ({
  className = '',
  icon,
  label,
  isActive,
  count,
  onClick,
}: IProps) => {
  return (
    <button
      className={clsx(
        {
          'bg-blue-500 text-white hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400':
            isActive,
        },
        className,
        'w-full text-left px-3 h-8 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-300',
      )}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
      <span>{` ${label}${count ? ` (${count}) ` : ''}`}</span>
    </button>
  );
};

export default RadioOption;
