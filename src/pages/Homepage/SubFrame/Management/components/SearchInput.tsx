import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchInput = () => {
  return (
    <div className="relative py-3">
      <input
        type="text"
        placeholder="Input name or email"
        className="rounded-full border border-gray-400 dark:bg-gray-300 dark:text-black pl-3 pr-7 py-1 w-full"
      />
      <button className="absolute right-2 inset-y-3 flex items-center dark:text-black">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchInput;
