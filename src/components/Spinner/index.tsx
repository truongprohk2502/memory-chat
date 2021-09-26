import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  className?: string;
}

export const Spinner = ({ className = '' }: IProps) => {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      className={clsx(className, 'animate-spin')}
    />
  );
};
