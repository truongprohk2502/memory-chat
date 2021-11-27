import { useState } from 'react';
import {
  faUserCheck,
  faUserClock,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import SubFrameLayout from 'layouts/SubFrameLayout';
import { useTranslation } from 'react-i18next';
import SearchFriendList from './SearchFriendList';
import RadioOption from './components/RadioOption';
import SearchInput from './components/SearchInput';

const Management = () => {
  const [managePage, setManagePage] = useState<
    'search' | 'waiting' | 'request'
  >('search');

  const { t } = useTranslation();

  return (
    <SubFrameLayout title={t('header.management')} subFrameType="dashboard">
      <div className="flex flex-col w-full h-full">
        <RadioOption
          icon={faUserPlus}
          label={t('management.make_friends')}
          className="rounded-t-md"
          isActive={managePage === 'search'}
          onClick={() => setManagePage('search')}
        />
        <RadioOption
          icon={faUserClock}
          label={t('management.waiting_for_confirmation')}
          isActive={managePage === 'waiting'}
          onClick={() => setManagePage('waiting')}
        />
        <RadioOption
          icon={faUserCheck}
          label={t('management.friend_request')}
          className="rounded-b-md"
          isActive={managePage === 'request'}
          onClick={() => setManagePage('request')}
        />
        <SearchInput />
        <SearchFriendList />
      </div>
    </SubFrameLayout>
  );
};

export default Management;
