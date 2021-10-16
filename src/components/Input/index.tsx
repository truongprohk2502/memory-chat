import { InputHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface IRadioOption {
  value: string;
  label: string;
}

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'date' | 'radio-group';
  value: string;
  disabled?: boolean;
  blocked?: boolean;
  i18nErrorPath?: string;
  touched?: boolean;
  readOnly?: boolean;
  radioOptions?: IRadioOption[];
  selectedRadioLabel?: string;
}

export const Input = ({
  type = 'text',
  value = '',
  disabled = false,
  blocked = false,
  i18nErrorPath,
  touched,
  readOnly = false,
  radioOptions = [],
  selectedRadioLabel = '',
  ...props
}: IProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {type === 'radio-group' ? (
        <div className="w-full flex px-2 h-8">
          {disabled ? (
            <span>{selectedRadioLabel}</span>
          ) : (
            radioOptions.map(option => (
              <div key={option.value} className="mr-8">
                <input
                  id={option.value}
                  disabled={disabled}
                  type="radio"
                  value={option.value}
                  checked={option.value === value}
                  {...props}
                />
                <label htmlFor={option.value} className="ml-2">
                  {option.label}
                </label>
              </div>
            ))
          )}
        </div>
      ) : (
        <input
          type={type}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          className={clsx(
            { 'w-full': blocked },
            { 'focus:border-0': readOnly },
            { 'focus:border-2': !readOnly },
            'h-8 px-2 border border-gray-300 bg-gray-200 disabled:bg-white focus:outline-none focus:border-black rounded-md disabled:border-0 disabled:px-0 disabled:text-sm disabled:font-semibold dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-900',
            {
              'border-red-500 focus:border-red-600 pr-7':
                i18nErrorPath && touched,
            },
          )}
          {...props}
        />
      )}
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
