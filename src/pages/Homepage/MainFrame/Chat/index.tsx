import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from 'reducers';
import { getMessagesRequest, IMessage } from 'reducers/message';
import { Spinner } from 'components/Spinner';
import { useTranslation } from 'react-i18next';
import { TIMEOUT } from 'constants/timeout';
import { LIMIT_MESSAGES } from 'constants/limitRecords';
import { IUser } from 'reducers/user';

type MessageType = 'you' | 'me';

interface IMessageGroup {
  messages: IMessage[];
  type: MessageType;
}

interface IProps {
  selectedUser: IUser;
}

const Chat = ({ selectedUser }: IProps) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const {
    messages,
    page,
    unavailableMoreMessages,
    pendingPostMessage,
    pendingGetInitMessages,
    pendingGetMessages,
  } = useSelector((state: RootState) => state.message);
  const { selectedContactId } = useSelector(
    (state: RootState) => state.contact,
  );

  const [groupMessages, setGroupMessages] = useState<IMessageGroup[]>([]);
  const [lastReadMessage, setLastReadMessage] = useState<IMessage>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (containerRef.current && !pendingGetInitMessages) {
      setTimeout(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }, TIMEOUT.RENDER_MESSAGES);
    }
  }, [pendingGetInitMessages]);

  useEffect(() => {
    if (containerRef.current && pendingPostMessage) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [pendingPostMessage, pendingGetInitMessages]);

  useEffect(() => {
    const containerElement = containerRef.current;

    if (
      containerElement &&
      selectedContactId &&
      !pendingGetMessages &&
      !unavailableMoreMessages
    ) {
      const handleScrollToTop = () => {
        if (!containerElement.scrollTop) {
          dispatch(
            getMessagesRequest({
              page: page + 1,
              limit: LIMIT_MESSAGES,
              contactId: selectedContactId,
            }),
          );
        }
      };

      containerElement.addEventListener('scroll', handleScrollToTop);

      return () => {
        containerElement.removeEventListener('scroll', handleScrollToTop);
      };
    }
  }, [
    selectedContactId,
    page,
    unavailableMoreMessages,
    pendingGetMessages,
    dispatch,
  ]);

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

  return (
    <div
      ref={containerRef}
      className="absolute inset-x-0 top-20 bottom-16 flex-auto pt-5 px-5 xl:px-20 overflow-y-auto"
    >
      {pendingGetMessages && (
        <div className="flex justify-center items-center my-2 text-black">
          <Spinner />
          <span>&nbsp;{t('chat.loading_message')}</span>
        </div>
      )}
      {groupMessages.map((group, index) =>
        group.type === 'you' ? (
          <div key={index} className="w-3/4 xl:w-3/5 flex">
            <img
              src={selectedUser.avatar}
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
      {pendingPostMessage && (
        <div className="flex justify-end items-center my-2 text-black">
          <Spinner />
          <span>&nbsp;{t('chat.sending_message')}</span>
        </div>
      )}
    </div>
  );
};

export default Chat;
