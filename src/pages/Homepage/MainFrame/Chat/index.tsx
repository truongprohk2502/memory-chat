import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from 'reducers';
import { addMessage, IMessage } from 'reducers/message';
import { PusherContext } from 'pages/Homepage';
import { PUSHER_EVENTS } from 'constants/pusherEvents';
import { addLastMessage } from 'reducers/contact';

type MessageType = 'you' | 'me';

interface IMessageGroup {
  messages: IMessage[];
  type: MessageType;
}

const Chat = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { messages } = useSelector((state: RootState) => state.message);
  const { selectedContact } = useSelector((state: RootState) => state.contact);

  const [groupMessages, setGroupMessages] = useState<IMessageGroup[]>([]);
  const [lastReadMessage, setLastReadMessage] = useState<IMessage>(null);

  const dispatch = useDispatch();
  const channel = useContext(PusherContext);

  useEffect(() => {
    if (channel) {
      channel.bind(PUSHER_EVENTS.GET_MESSAGE, data => {
        dispatch(addLastMessage(data));
        selectedContact.id === data?.contact?.id && dispatch(addMessage(data));
      });

      return () => {
        channel.unbind(PUSHER_EVENTS.GET_MESSAGE);
      };
    }
  }, [channel, selectedContact, dispatch]);

  useEffect(() => {
    if (!userInfo) return;

    const { email, accountType } = userInfo;

    let groups: IMessageGroup[] = [];
    let newGroup: IMessageGroup;
    let type: MessageType;

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      if (
        message.sender.email === email &&
        message.sender.accountType === accountType &&
        message.isRead
      ) {
        setLastReadMessage(message);
        break;
      }
    }

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (
        message.sender.email === email &&
        message.sender.accountType === accountType
      ) {
        if (message.isRead) {
          setLastReadMessage(message);
        }

        if (!type || type === 'you') {
          type = 'me';
          newGroup = {
            messages: [message],
            type,
          };
          groups.push(newGroup);
        } else {
          newGroup.messages.push(message);
        }
      } else {
        if (!type || type === 'me') {
          type = 'you';
          newGroup = {
            messages: [message],
            type,
          };
          groups.push(newGroup);
        } else {
          newGroup.messages.push(message);
        }
      }
    }

    setGroupMessages(groups);
  }, [messages, userInfo]);

  const selectedUser = selectedContact.members.find(
    user =>
      !(
        user.email === userInfo?.email &&
        user.accountType === userInfo?.accountType
      ),
  );

  return (
    <div className="absolute inset-x-0 top-20 bottom-16 flex-auto pt-5 px-5 xl:px-20 overflow-y-auto">
      {groupMessages.map((group, index) =>
        group.type === 'you' ? (
          <div key={index} className="w-3/4 xl:w-3/5 flex">
            <img
              src={selectedUser?.avatar}
              alt="logo"
              className="w-10 h-10 object-cover rounded-full mr-4"
            />
            <div>
              {group.messages.map((message, index) => (
                <div
                  key={message.id}
                  className={clsx(
                    { 'rounded-tl-full': index === 0 },
                    { 'rounded-bl-full': index === group.messages.length - 1 },
                    'rounded-r-full bg-blue-500 text-white px-3 py-2 my-1',
                  )}
                >
                  {message.text ? message.text : 'FILE'}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            key={index}
            className="w-3/4 xl:w-2/5 ml-auto my-2 relative text-black"
          >
            {group.messages.map((message, index) => (
              <div key={message.id} className="flex items-center">
                <div
                  className={clsx(
                    { 'rounded-tr-full': index === 0 },
                    { 'rounded-br-full': index === group.messages.length - 1 },
                    'rounded-l-full bg-gray-300 px-3 py-2 mb-2 flex-auto',
                  )}
                >
                  {message.text ? message.text : 'FILE'}
                </div>
                {message.isRead && lastReadMessage?.id === message.id && (
                  <img
                    src={selectedUser?.avatar}
                    alt="logo"
                    className="w-4 h-4 object-cover rounded-full"
                  />
                )}
                {!message.isRead && (
                  <div className="ml-1">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-gray-400"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ),
      )}
    </div>
  );
};

export default Chat;
