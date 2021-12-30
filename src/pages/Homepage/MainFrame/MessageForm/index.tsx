import { useRef, useState } from 'react';
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
import { postMessageRequest } from 'reducers/message';
import { RootState } from 'reducers';
import { EmojiPicker } from 'components/EmojiPicker';
import clsx from 'clsx';
import useClickOutside from 'hooks/useClickOutside';

const MessageForm = () => {
  const [message, setMessage] = useState<string>('');

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { selectedContactId } = useSelector(
    (state: RootState) => state.contact,
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [openEmojiModal, setOpenEmojiModal] = useClickOutside(wrapperRef);

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

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute inset-x-0 bottom-0 h-16 py-4 px-5 xl:px-20 flex justify-between items-center border-t border-gray-150 dark:border-gray-500 bg-white dark:bg-gray-900"
    >
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
          onClick={() => {}}
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
        />
      </div>
      <input
        type="text"
        className="flex-auto focus:outline-none dark:bg-gray-900"
        placeholder={t('chat.message.placeholder')}
        value={message}
        onChange={handleChangeMessage}
      />
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
          onClick={() => {}}
        />
      </div>
    </form>
  );
};

export default MessageForm;
