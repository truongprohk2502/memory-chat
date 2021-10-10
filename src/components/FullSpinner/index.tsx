import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  className?: string;
  spinnerClassName?: string;
}

export const FullSpinner = ({
  className = '',
  spinnerClassName = '',
}: IProps) => {
  return (
    <div
      className={clsx(
        className,
        'fixed inset-0 flex justify-center items-center text-5xl z-50 bg-white opacity-50',
      )}
    >
      <FontAwesomeIcon
        icon={faSpinner}
        className={clsx(spinnerClassName, 'animate-spin')}
      />
    </div>
  );
};
