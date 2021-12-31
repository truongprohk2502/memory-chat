import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImgsViewer from 'react-images-viewer';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from 'reducers';
import { getMessagesRequest, IMessage } from 'reducers/message';
import { Spinner } from 'components/Spinner';
import { useTranslation } from 'react-i18next';
import { TIMEOUT } from 'constants/timeout';
import { LIMIT_MESSAGES } from 'constants/limitRecords';
import { IUser } from 'reducers/user';
import { IMAGE_TYPES } from 'constants/file';

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
  const [openImagePreview, setOpenImagePreview] = useState<boolean>(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imagePreviewNum, setImagePreviewNum] = useState<number>(0);

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

  useEffect(() => {
    setImagePreviews(
      messages
        .filter(
          message => message.file && IMAGE_TYPES.includes(message.file.type),
        )
        .map(message => message.file.url),
    );
  }, [messages]);

  const handleShowImagePreview = (url: string) => {
    setImagePreviewNum(imagePreviews.findIndex(imageUrl => imageUrl === url));
    setOpenImagePreview(true);
  };

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
                  className={
                    message.text
                      ? clsx(
                          { 'rounded-tl-lg': index === 0 },
                          {
                            'rounded-bl-lg':
                              index === group.messages.length - 1,
                          },
                          'rounded-r-lg bg-blue-500 text-white px-3 py-2 my-1',
                        )
                      : 'w-32 h-32'
                  }
                >
                  {message.text ? (
                    message.text
                  ) : IMAGE_TYPES.includes(message.file.type) ? (
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={message.file.url}
                      alt={message.file.name}
                      onClick={() => handleShowImagePreview(message.file.url)}
                    />
                  ) : (
                    'FILE'
                  )}
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
              <div key={message.id} className="flex items-center justify-end">
                <div
                  className={
                    message.text
                      ? clsx(
                          { 'rounded-tr-lg': index === 0 },
                          {
                            'rounded-br-lg':
                              index === group.messages.length - 1,
                          },
                          'rounded-l-lg bg-gray-300 px-3 py-2 mb-2',
                        )
                      : 'w-32 h-32'
                  }
                >
                  {message.text ? (
                    message.text
                  ) : IMAGE_TYPES.includes(message.file.type) ? (
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={message.file.url}
                      alt={message.file.name}
                      onClick={() => handleShowImagePreview(message.file.url)}
                    />
                  ) : (
                    'FILE'
                  )}
                </div>
                <div className="w-4 h-4 ml-2">
                  {message.isRead && lastReadMessage?.id === message.id && (
                    <img
                      src={selectedUser?.avatar}
                      alt="logo"
                      className="w-full h-full object-cover rounded-full"
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
              </div>
            ))}
          </div>
        ),
      )}
      <ImgsViewer
        imgs={imagePreviews.map(url => ({ src: url }))}
        isOpen={openImagePreview}
        currImg={imagePreviewNum}
        backdropCloseable
        onClickPrev={() => setImagePreviewNum(imagePreviewNum - 1)}
        onClickNext={() => setImagePreviewNum(imagePreviewNum + 1)}
        onClose={() => setOpenImagePreview(false)}
      />
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
