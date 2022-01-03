import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImgsViewer from 'react-images-viewer';
import {
  faCheckCircle,
  faDownload,
  faFile,
  faFileCode,
  faFileContract,
  faFileExcel,
  faFilePdf,
  faFilePowerpoint,
  faFileWord,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from 'reducers';
import { getMessagesRequest, IMessage } from 'reducers/message';
import { Spinner } from 'components/Spinner';
import { useTranslation } from 'react-i18next';
import { TIMEOUT } from 'constants/timeout';
import { LIMIT_MESSAGES } from 'constants/limitRecords';
import { IUser } from 'reducers/user';
import { FILE_TYPES } from 'constants/file';
import { faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { downloadFile } from 'utils/downloadFile';

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
          message =>
            message.file && FILE_TYPES.IMAGE_TYPES.includes(message.file.type),
        )
        .map(message => message.file.url),
    );
  }, [messages]);

  const handleShowImagePreview = (url: string) => {
    setImagePreviewNum(imagePreviews.findIndex(imageUrl => imageUrl === url));
    setOpenImagePreview(true);
  };

  const handleDownload = (url: string, originalName: string) => {
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    downloadFile(fileName, originalName);
  };

  const renderMessage = (message: IMessage, index: number, total: number) => {
    let icon: IconDefinition;
    let sizeText: string;

    if (message.file) {
      const { type, size } = message.file;

      if (
        FILE_TYPES.UPLOAD_TYPES.find(
          fileType => fileType.type === 'word',
        ).data.includes(type)
      ) {
        icon = faFileWord;
      } else if (
        FILE_TYPES.UPLOAD_TYPES.find(
          fileType => fileType.type === 'excel',
        ).data.includes(type)
      ) {
        icon = faFileExcel;
      } else if (
        FILE_TYPES.UPLOAD_TYPES.find(
          fileType => fileType.type === 'powerpoint',
        ).data.includes(type)
      ) {
        icon = faFilePowerpoint;
      } else if (
        FILE_TYPES.UPLOAD_TYPES.find(
          fileType => fileType.type === 'html',
        ).data.includes(type)
      ) {
        icon = faHtml5;
      } else if (
        FILE_TYPES.UPLOAD_TYPES.find(
          fileType => fileType.type === 'json',
        ).data.includes(type)
      ) {
        icon = faFileCode;
      } else if (
        FILE_TYPES.UPLOAD_TYPES.find(
          fileType => fileType.type === 'pdf',
        ).data.includes(type)
      ) {
        icon = faFilePdf;
      } else if (
        FILE_TYPES.UPLOAD_TYPES.find(
          fileType => fileType.type === 'txt',
        ).data.includes(type)
      ) {
        icon = faFileContract;
      } else {
        icon = faFile;
      }

      const kilobyte = 1024;
      const megabyte = 1024 * kilobyte;
      const gigabyte = 1024 * megabyte;

      if (size < kilobyte) {
        sizeText = `${size} B`;
      } else if (size < megabyte) {
        sizeText = `${Math.round(10 * (size / kilobyte)) / 10} KB`;
      } else if (size < gigabyte) {
        sizeText = `${Math.round(10 * (size / megabyte)) / 10} MB`;
      } else {
        sizeText = `${Math.round(10 * (size / gigabyte)) / 10} GB`;
      }
    }

    return message.text ? (
      message.text
    ) : FILE_TYPES.IMAGE_TYPES.includes(message.file.type) ? (
      <img
        className={clsx(
          { 'rounded-tr-lg': index === 0 },
          {
            'rounded-br-lg': index === total - 1,
          },
          'w-full h-full object-cover rounded-l-lg',
        )}
        src={message.file.url}
        alt={message.file.name}
        onClick={() => handleShowImagePreview(message.file.url)}
      />
    ) : (
      <div className="w-full h-full p-2 border border-gray-400 rounded-lg flex items-center">
        <div className="w-1/6 pl-1">
          <div className="w-10 h-10 rounded-full bg-blue-300 flex justify-center items-center">
            <FontAwesomeIcon icon={icon} className="text-blue-500" />
          </div>
        </div>
        <div className="w-2/3">
          <div className="font-semibold text-gray-600 dark:text-white">
            {message.file.name}
          </div>
          <div className="text-gray-500 text-sm dark:text-gray-400">
            {sizeText}
          </div>
        </div>
        <div className="w-1/6 flex justify-end pr-2">
          <button
            onClick={() => handleDownload(message.file.url, message.file.name)}
          >
            <FontAwesomeIcon icon={faDownload} className="text-blue-500" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-x-0 top-20 bottom-16 flex-auto pt-5 px-5 xl:px-20 overflow-y-auto"
    >
      {pendingGetMessages && (
        <div className="flex justify-center items-center my-2 text-black dark:text-white">
          <Spinner />
          <span>&nbsp;{t('chat.loading_message')}</span>
        </div>
      )}
      {groupMessages.map((group, index) =>
        group.type === 'you' ? (
          <div key={index} className="w-3/4 lg:w-3/5 xl:w-3/4 flex">
            <img
              src={selectedUser.avatar}
              alt="logo"
              className="w-10 h-10 object-cover rounded-full mr-4"
            />
            <div>
              {group.messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`mb-2 
                    ${
                      message.text
                        ? clsx(
                            { 'rounded-tl-lg': index === 0 },
                            {
                              'rounded-bl-lg':
                                index === group.messages.length - 1,
                            },
                            'rounded-r-lg bg-blue-500 text-white px-3 py-2 my-1',
                          )
                        : FILE_TYPES.IMAGE_TYPES.includes(message.file.type)
                        ? 'w-32 h-32 my-1'
                        : clsx(
                            { 'rounded-tl-lg': index === 0 },
                            {
                              'rounded-bl-lg':
                                index === group.messages.length - 1,
                            },
                            'rounded-r-lg bg-blue-500 text-white px-3 py-2 my-1 w-100 h-20',
                          )
                    }`}
                >
                  {renderMessage(message, index, group.messages.length)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            key={index}
            className="w-3/4 lg:w-3/5 xl:w-3/4 ml-auto relative text-black"
          >
            {group.messages.map((message, index) => (
              <div
                key={message.id}
                className="flex items-center justify-end mb-2"
              >
                <div
                  className={`dark:bg-gray-700 dark:text-white ${
                    message.text
                      ? clsx(
                          { 'rounded-tr-lg': index === 0 },
                          {
                            'rounded-br-lg':
                              index === group.messages.length - 1,
                          },
                          'rounded-l-lg bg-gray-300 px-3 py-2',
                        )
                      : FILE_TYPES.IMAGE_TYPES.includes(message.file.type)
                      ? 'w-32 h-32'
                      : clsx(
                          { 'rounded-tr-lg': index === 0 },
                          {
                            'rounded-br-lg':
                              index === group.messages.length - 1,
                          },
                          'rounded-l-lg bg-gray-300 px-3 py-2 w-100 h-20',
                        )
                  }`}
                >
                  {renderMessage(message, index, group.messages.length)}
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
        <div className="flex justify-end items-center my-2 text-black dark:te">
          <Spinner />
          <span>&nbsp;{t('chat.sending_message')}</span>
        </div>
      )}
    </div>
  );
};

export default Chat;
