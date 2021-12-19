import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContactCard } from 'components/ContactCard';
import SubFrameLayout from 'layouts/SubFrameLayout';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

const FriendList = () => {
  const { t } = useTranslation();
  const { activeContacts } = useSelector((state: RootState) => state.contact);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <SubFrameLayout title={t('header.friends')} subFrameType="friend">
      <div className="flex flex-col w-full h-full">
        <div className="relative mb-5">
          <input
            className="h-8 pl-8 pr-2 rounded-full w-full bg-gray-200 dark:bg-gray-500 focus:outline-none"
            type="text"
            placeholder={t('management.placeholders.search_friend')}
          />
          <div className="absolute left-2 inset-y-0 flex items-center">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        <div className="overflow-y-auto flex-auto">
          {activeContacts.map(contact => (
            <ContactCard
              key={contact.id}
              userInfo={contact.members.find(
                user =>
                  !(
                    user.email === userInfo.email &&
                    user.accountType === userInfo.accountType
                  ),
              )}
            />
          ))}
        </div>
      </div>
    </SubFrameLayout>
  );
};

export default FriendList;
