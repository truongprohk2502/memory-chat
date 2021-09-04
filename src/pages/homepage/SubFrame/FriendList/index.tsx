import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContactCard } from 'components/ContactCard';
import SubFrameLayout from 'layouts/SubFrameLayout';
import { useTranslation } from 'react-i18next';

const FriendList = () => {
  const { t } = useTranslation();

  return (
    <SubFrameLayout title={t('header.friends')} subFrameType="friend">
      <div className="flex flex-col w-full h-full">
        <div className="relative mb-5">
          <input
            className="h-8 pl-8 pr-2 rounded-full w-full bg-gray-200 dark:bg-gray-500 focus:outline-none"
            type="text"
            placeholder="Enter name..."
          />
          <div className="absolute left-2 inset-y-0 flex items-center">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        <div className="overflow-y-auto flex-auto">
          <ContactCard />
        </div>
      </div>
    </SubFrameLayout>
  );
};

export default FriendList;
