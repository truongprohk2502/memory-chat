import { SIGNING_INPUT } from 'constants/classNames';

interface IRadioOption {
  value: string;
  label: string;
}

interface IProps {
  type?: 'text' | 'password' | 'date' | 'radio-group';
  title: string;
  linkTitle?: string;
  onClickLinkTitle?: () => void;
  radioOptions?: IRadioOption[];
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e) => void;
  onBlur: (e) => void;
  hasError: boolean;
  error: string;
}

export const SigningInput = ({
  type = 'text',
  title,
  linkTitle,
  onClickLinkTitle,
  radioOptions,
  name,
  placeholder = '',
  value,
  onChange,
  onBlur,
  hasError,
  error,
}: IProps) => {
  return (
    <div className="flex flex-col my-4">
      {linkTitle ? (
        <div className="mb-2">
          <span className="font-bold text-lg text-gray-500">{title}</span>
          <span
            className="text-lg underline text-gray-400 ml-2 cursor-pointer"
            onClick={onClickLinkTitle}
          >
            {linkTitle}
          </span>
        </div>
      ) : (
        <span className="font-bold text-lg text-gray-500 mb-2">{title}</span>
      )}
      {type === 'radio-group' ? (
        <div className="w-full flex my-4">
          {radioOptions.map(option => (
            <div key={option.value} className="mr-8">
              <input
                type="radio"
                name={name}
                id={option.value}
                value={option.value}
                onChange={onChange}
                onBlur={onBlur}
              />
              <label htmlFor={option.value} className="ml-2">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          className={SIGNING_INPUT}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {hasError && <span className="text-red-500 text-sm mt-2">{error}</span>}
    </div>
  );
};
