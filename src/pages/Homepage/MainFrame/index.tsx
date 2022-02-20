import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import logo from 'assets/images/logo.png';
import { PusherContext } from '..';
import { PUSHER_EVENTS } from 'constants/pusherEvents';
import Header from './Header';
import Chat from './Chat';
import MessageForm from './MessageForm';
import { CallModal } from 'components/CallModal';
import { DialogModal } from 'components/DialogModal';
import {
  addLastMessage,
  setContactConnection,
  setReadMessageContact,
} from 'reducers/contact';
import {
  addMessage,
  addStopCallMessage,
  setCallingData,
  setReadMessages,
} from 'reducers/message';

const MainFrame = () => {
  const [isOpenCallModal, setIsOpenCallModal] = useState<boolean>(false);

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { selectedContactId, activeContacts } = useSelector(
    (state: RootState) => state.contact,
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channel = useContext(PusherContext);

  useEffect(() => {
    if (channel) {
      channel.bind(PUSHER_EVENTS.GET_MESSAGE, data => {
        dispatch(
          addLastMessage({ message: data, increaseUnreadMessage: true }),
        );
        selectedContactId &&
          selectedContactId === data?.contact?.id &&
          dispatch(addMessage(data));
      });

      return () => {
        channel.unbind(PUSHER_EVENTS.GET_MESSAGE);
      };
    }
  }, [channel, selectedContactId, dispatch]);

  useEffect(() => {
    if (channel) {
      channel.bind(PUSHER_EVENTS.CONNECT_CONTACT, data => {
        dispatch(setContactConnection({ userId: data, isOnline: true }));
      });

      return () => {
        channel.unbind(PUSHER_EVENTS.CONNECT_CONTACT);
      };
    }
  }, [channel, dispatch]);

  useEffect(() => {
    if (channel) {
      channel.bind(PUSHER_EVENTS.DISCONNECT_CONTACT, data => {
        dispatch(setContactConnection({ userId: data, isOnline: false }));
      });

      return () => {
        channel.unbind(PUSHER_EVENTS.DISCONNECT_CONTACT);
      };
    }
  }, [channel, dispatch]);

  useEffect(() => {
    if (channel) {
      channel.bind(PUSHER_EVENTS.READ_MESSAGES, data => {
        const { contactId, messageIds } = data;

        dispatch(setReadMessageContact(data));

        selectedContactId === contactId &&
          dispatch(setReadMessages(messageIds));
      });

      return () => {
        channel.unbind(PUSHER_EVENTS.READ_MESSAGES);
      };
    }
  }, [channel, selectedContactId, dispatch]);

  useEffect(() => {
    if (channel) {
      channel.bind(PUSHER_EVENTS.RECEIVE_CALL, data => {
        dispatch(setCallingData(data));
      });

      return () => {
        channel.unbind(PUSHER_EVENTS.RECEIVE_CALL);
      };
    }
  }, [channel, dispatch]);

  useEffect(() => {
    if (channel) {
      channel.bind(PUSHER_EVENTS.STOP_CALL, data => {
        dispatch(addStopCallMessage(data));
        dispatch(
          addLastMessage({ message: data, increaseUnreadMessage: false }),
        );
      });

      return () => {
        channel.unbind(PUSHER_EVENTS.STOP_CALL);
      };
    }
  }, [channel, dispatch]);

  const selectedUser = activeContacts
    .find(contact => contact.id === selectedContactId)
    ?.members.find(
      user =>
        !(
          user.email === userInfo?.email &&
          user.accountType === userInfo?.accountType
        ),
    );

  return (
    <section className="fixed flex flex-col justify-between left-28 lg:left-124 transition-all duration-150 right-0 inset-y-0 border-l border-gray-150 bg-white dark:bg-gray-900 dark:border-gray-500">
      {selectedUser ? (
        <div className="w-full h-full relative">
          <Header
            selectedUser={selectedUser}
            setOpenCallModal={() => setIsOpenCallModal(true)}
          />
          <Chat selectedUser={selectedUser} />
          <MessageForm />
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center">
              <img src={logo} alt="logo" className="w-12 h-12" />
            </div>
            <div className="font-bold mt-2 text-lg">{t('chat.welcome')}</div>
          </div>
        </div>
      )}
      <CallModal
        isOpen={isOpenCallModal}
        onClose={() => setIsOpenCallModal(false)}
      />
      <DialogModal />
    </section>
  );
};

export default MainFrame;
