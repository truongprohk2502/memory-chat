import { InputHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  blocked?: boolean;
  i18nErrorPath?: string;
  touched?: boolean;
}

export const Input = ({
  blocked = false,
  i18nErrorPath,
  touched,
  ...props
}: IProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <input
        className={clsx(
          { 'w-full': blocked },
          'h-8 px-2 border border-gray-300 focus:outline-none focus:border-2 focus:border-black rounded-md disabled:border-0 disabled:px-0 disabled:text-sm disabled:font-semibold dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-900',
          {
            'border-red-500 focus:border-red-600 pr-7':
              i18nErrorPath && touched,
          },
        )}
        {...props}
      />
      {i18nErrorPath && touched && (
        <>
          <div className="text-red-500 absolute inset-y-0 right-2 flex items-center">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
          <div className="absolute rounded-md top-7 right-0 text-sm px-1 bg-red-500 text-white">
            {t(i18nErrorPath)}
          </div>
        </>
      )}
    </div>
  );
};
