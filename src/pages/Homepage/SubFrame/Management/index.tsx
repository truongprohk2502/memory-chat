import { useState } from 'react';
import {
  faUserCheck,
  faUserClock,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import SubFrameLayout from 'layouts/SubFrameLayout';
import SearchFriendList from './SearchFriendList';
import RadioOption from './components/RadioOption';
import SearchInput from './components/SearchInput';
import { getUsersByKeywordRequest } from 'reducers/user';
import SendRequestList from './SendRequestList';
import ReceiveRequestList from './ReceiveRequestList';

const Management = () => {
  const [managePage, setManagePage] = useState<
    'search' | 'waiting' | 'request'
  >('search');
  const [keyword, setKeyword] = useState<string>('');

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSetKeyword = e => {
    setKeyword(e.target.value);
  };

  const handleSearchUsersByKeyword = e => {
    e.preventDefault();
    if (keyword.trim().length) {
      dispatch(getUsersByKeywordRequest(keyword));
    }
  };

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
        <SearchInput
          value={keyword}
          onChange={handleSetKeyword}
          onSubmit={handleSearchUsersByKeyword}
        />
        {managePage === 'search' ? (
          <SearchFriendList />
        ) : managePage === 'request' ? (
          <SendRequestList />
        ) : (
          <ReceiveRequestList />
        )}
      </div>
    </SubFrameLayout>
  );
};

export default Management;
