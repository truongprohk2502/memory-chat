import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  faLaugh,
  faMicrophone,
  faPaperclip,
  faPaperPlane,
  faPhotoVideo,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/Button';
import {
  postMessageRequest,
  putReadMessagesRequest,
  resetReadMessages,
  setReadMessages,
} from 'reducers/message';
import { RootState } from 'reducers';
import { EmojiPicker } from 'components/EmojiPicker';
import clsx from 'clsx';
import useClickOutside from 'hooks/useClickOutside';
import { FILE_TYPES, LIMIT_SIZE } from 'constants/file';
import { toast } from 'react-toastify';
import { useVisibleWebsite } from 'hooks/useVisibleWebsite';

const MessageForm = () => {
  const [message, setMessage] = useState<string>('');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { selectedContactId } = useSelector(
    (state: RootState) => state.contact,
  );
  const { messages, alreadyReadMessageData } = useSelector(
    (state: RootState) => state.message,
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const visibleWebsite = useVisibleWebsite();

  const [openEmojiModal, setOpenEmojiModal] = useClickOutside(wrapperRef);

  useEffect(() => {
    if (alreadyReadMessageData) {
      selectedContactId === alreadyReadMessageData.contactId &&
        dispatch(setReadMessages(alreadyReadMessageData.messageIds));

      dispatch(resetReadMessages());
    }
  }, [alreadyReadMessageData, selectedContactId, dispatch]);

  useEffect(() => {
    if (inputRef.current && !visibleWebsite) {
      inputRef.current.blur();
    }
  }, [visibleWebsite]);

  const handleSubmit = e => {
    e.preventDefault();
    setMessage('');
    selectedContactId &&
      dispatch(
        postMessageRequest({ text: message, contactId: selectedContactId }),
      );
  };

  const handleChangeMessage = e => {
    const message = e.target.value;
    setMessage(message);
  };

  const handlePostImage = e => {
    const file = e.target.files[0];

    if (!file) return;

    if (!FILE_TYPES.IMAGE_TYPES.includes(file.type)) {
      toast.error(t('chat.upload_image.invalid_file_type'));
      return;
    }

    if (file.size > LIMIT_SIZE.IMAGE_SIZE) {
      toast.error(t('chat.upload_image.too_heavy_file_size'));
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    dispatch(
      postMessageRequest({
        contactId: selectedContactId,
        formData,
        dataType: 'image',
      }),
    );
  };

  const handlePostFile = e => {
    const file = e.target.files[0];

    if (!file) return;

    if (
      !FILE_TYPES.UPLOAD_TYPES.reduce(
        (arr, type) => [...arr, ...type.data],
        [],
      ).includes(file.type)
    ) {
      toast.error(t('chat.upload_image.unsupported_file_type'));
      return;
    }

    if (file.size > LIMIT_SIZE.FILE_SIZE) {
      toast.error(t('chat.upload_image.too_heavy_file_size'));
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    dispatch(
      postMessageRequest({
        contactId: selectedContactId,
        formData,
        dataType: 'file',
      }),
    );
  };

  const handleReadMessages = () => {
    selectedContactId &&
      messages.some(
        message =>
          !message.isRead &&
          !(
            message.sender.email === userInfo.email &&
            message.sender.accountType === userInfo.accountType
          ),
      ) &&
      dispatch(putReadMessagesRequest(selectedContactId));
  };

  return (
    <div className="absolute inset-x-0 bottom-0 h-16 py-4 px-5 xl:px-20 flex justify-between items-center border-t border-gray-150 dark:border-gray-500 bg-white dark:bg-gray-900">
      <div className="flex relative">
        <div
          ref={wrapperRef}
          className={clsx(
            { hidden: !openEmojiModal },
            'absolute bottom-16 left-0',
          )}
        >
          <EmojiPicker onSelect={emoji => setMessage(message + emoji)} />
        </div>
        <Button
          containerClassName="mr-4"
          variant="circle"
          icon={faLaugh}
          iconColorClassName="text-blue-500"
          hasOnlyButton={false}
          hasTooltip
          tooltipName={t('chat.message.buttons.sticker')}
          tooltipPlacement="top-right"
          onClick={() => !openEmojiModal && setOpenEmojiModal(true)}
        />
        <Button
          id="attach-file"
          isFileButton
          containerClassName="mr-4"
          variant="circle"
          icon={faPaperclip}
          iconColorClassName="text-blue-500"
          hasOnlyButton={false}
          hasTooltip
          tooltipName={t('chat.message.buttons.file')}
          tooltipPlacement="top-right"
          onChange={handlePostFile}
        />
        <Button
          id="attach-media"
          isFileButton
          containerClassName="mr-4"
          variant="circle"
          icon={faPhotoVideo}
          iconColorClassName="text-blue-500"
          hasOnlyButton={false}
          hasTooltip
          tooltipName={t('chat.message.buttons.media')}
          tooltipPlacement="top-right"
          onClick={() => {}}
          onChange={handlePostImage}
        />
      </div>
      <form onSubmit={handleSubmit} className="flex-auto">
        <input
          ref={inputRef}
          type="text"
          className="w-full focus:outline-none dark:bg-gray-900"
          placeholder={t('chat.message.placeholder')}
          value={message}
          onChange={handleChangeMessage}
          onFocus={handleReadMessages}
        />
      </form>
      <div className="flex">
        <Button
          containerClassName="ml-4"
          variant="circle"
          icon={faMicrophone}
          iconColorClassName="text-blue-500"
          hasOnlyButton={false}
          hasTooltip
          tooltipName={t('chat.message.buttons.record_audio')}
          tooltipPlacement="top-left"
          onClick={() => {}}
        />
        <Button
          type="submit"
          containerClassName="ml-4"
          variant="circle"
          color="primary"
          disabled={message.trim().length === 0}
          icon={faPaperPlane}
          hasOnlyButton={false}
          hasTooltip
          tooltipName={t('chat.message.buttons.send')}
          tooltipPlacement="top-left"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default MessageForm;
