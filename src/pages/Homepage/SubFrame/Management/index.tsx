import { useContext, useEffect, useState } from 'react';
import {
  faUserCheck,
  faUserClock,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SubFrameLayout from 'layouts/SubFrameLayout';
import SearchFriendList from './SearchFriendList';
import RadioOption from './components/RadioOption';
import SearchInput from './components/SearchInput';
import { getUsersByKeywordRequest } from 'reducers/user';
import SendRequestList from './SendRequestList';
import ReceiveRequestList from './ReceiveRequestList';
import {
  addApprovedContact,
  addReceivingContact,
  getContactsRequest,
  removeActiveContact,
  removeReceivingContact,
  removeSendingContact,
} from 'reducers/contact';
import { PusherContext } from 'pages/Homepage';
import {
  CANCEL_CONTACT,
  CONFIRM_CONTACT,
  DELETE_CONTACT,
  RECEIVE_CONTACT,
  UNFRIEND_CONTACT,
} from 'constants/pusherEvents';
import { RootState } from 'reducers';

const Management = () => {
  const [managePage, setManagePage] = useState<
    'search' | 'waiting' | 'request'
  >('search');
  const [keyword, setKeyword] = useState<string>('');

  const { sendingContacts, receivingContacts } = useSelector(
    (state: RootState) => state.contact,
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channel = useContext(PusherContext);

  useEffect(() => {
    if (channel) {
      channel.bind(RECEIVE_CONTACT, data => {
        dispatch(addReceivingContact(data));
      });

      channel.bind(CONFIRM_CONTACT, data => {
        dispatch(addApprovedContact(data));
      });

      channel.bind(CANCEL_CONTACT, data => {
        dispatch(removeReceivingContact(data));
      });

      channel.bind(DELETE_CONTACT, data => {
        dispatch(removeSendingContact(data));
      });

      channel.bind(UNFRIEND_CONTACT, data => {
        dispatch(removeActiveContact(data));
      });

      return () => {
        channel.unbind(RECEIVE_CONTACT);
        channel.unbind(CONFIRM_CONTACT);
        channel.unbind(CANCEL_CONTACT);
        channel.unbind(DELETE_CONTACT);
        channel.unbind(UNFRIEND_CONTACT);
      };
    }
  }, [channel, dispatch]);

  useEffect(() => {
    dispatch(getContactsRequest());
  }, [dispatch]);

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
          count={receivingContacts.length}
          onClick={() => setManagePage('waiting')}
        />
        <RadioOption
          icon={faUserCheck}
          label={t('management.friend_request')}
          className="rounded-b-md"
          isActive={managePage === 'request'}
          count={sendingContacts.length}
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
