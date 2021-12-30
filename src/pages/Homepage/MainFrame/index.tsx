import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import logo from 'assets/images/logo.png';
import { PusherContext } from '..';
import { PUSHER_EVENTS } from 'constants/pusherEvents';
import Header from './Header';
import Chat from './Chat';
import MessageForm from './MessageForm';
import { addLastMessage, setContactConnection } from 'reducers/contact';
import { addMessage } from 'reducers/message';

const MainFrame = () => {
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
          <Header selectedUser={selectedUser} />
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
    </section>
  );
};

export default MainFrame;
