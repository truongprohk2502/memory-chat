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
import { PUSHER_EVENTS } from 'constants/pusherEvents';
import { RootState } from 'reducers';
import { Button } from 'components/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

const Management = () => {
  const [managePage, setManagePage] = useState<
    'search' | 'waiting' | 'request'
  >('search');
  const [keyword, setKeyword] = useState<string>('');

  const { sendingContacts, receivingContacts } = useSelector(
    (state: RootState) => state.contact,
  );
  const { role } = useSelector((state: RootState) => state.auth);

  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channel = useContext(PusherContext);

  useEffect(() => {
    if (channel) {
      channel.bind(PUSHER_EVENTS.RECEIVE_CONTACT, data => {
        dispatch(addReceivingContact(data));
      });

      channel.bind(PUSHER_EVENTS.CONFIRM_CONTACT, data => {
        dispatch(addApprovedContact(data));
      });

      channel.bind(PUSHER_EVENTS.CANCEL_CONTACT, data => {
        dispatch(removeReceivingContact(data));
      });

      channel.bind(PUSHER_EVENTS.DELETE_CONTACT, data => {
        dispatch(removeSendingContact(data));
      });

      channel.bind(PUSHER_EVENTS.UNFRIEND_CONTACT, data => {
        dispatch(removeActiveContact(data));
      });

      return () => {
        channel.unbind(PUSHER_EVENTS.RECEIVE_CONTACT);
        channel.unbind(PUSHER_EVENTS.CONFIRM_CONTACT);
        channel.unbind(PUSHER_EVENTS.CANCEL_CONTACT);
        channel.unbind(PUSHER_EVENTS.DELETE_CONTACT);
        channel.unbind(PUSHER_EVENTS.UNFRIEND_CONTACT);
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
        {role === 'admin' && (
          <Button
            text={t('management.manage_user_button')}
            buttonClassName="mb-4"
            onClick={() => history.push(ROUTES.MANAGE_USER)}
          />
        )}
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
