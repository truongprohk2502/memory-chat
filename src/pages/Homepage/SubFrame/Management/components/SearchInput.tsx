import { useTranslation } from 'react-i18next';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  value: string;
  onChange: (e: any) => void;
  onSubmit: (e: any) => void;
}

const SearchInput = ({ value, onChange, onSubmit }: IProps) => {
  const { t } = useTranslation();

  return (
    <form className="relative py-3" onSubmit={onSubmit}>
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={t('management.placeholders.search_user')}
        className="rounded-full border border-gray-400 dark:bg-gray-300 dark:text-black pl-3 pr-7 py-1 w-full"
      />
      <button
        className="absolute right-2 inset-y-3 flex items-center dark:text-black"
        type="submit"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchInput;
