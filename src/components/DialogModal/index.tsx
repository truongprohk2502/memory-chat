import { useEffect, useRef } from 'react';
import { faPhoneAlt, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { getFullname } from 'utils/getFullname';
import { DIALOG_TIME } from 'constants/call';
import { putStartCallRequest, putStopCallRequest } from 'reducers/message';
// @ts-ignore
import ringtone from 'assets/audio/ringtone.mp3';

export const DialogModal = () => {
  const { callingData } = useSelector((state: RootState) => state.message);

  const stopCallTimeoutRef = useRef<any>(null);
  const ringtoneRef = useRef<HTMLAudioElement>(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClearDialog = () => {
    if (ringtoneRef.current && stopCallTimeoutRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
      clearTimeout(stopCallTimeoutRef.current);
    }
  };

  useEffect(() => {
    if (callingData) {
      ringtoneRef.current.play();
      stopCallTimeoutRef.current = setTimeout(() => {
        dispatch(putStopCallRequest({ messageId: callingData.dialogId }));
        handleClearDialog();
      }, DIALOG_TIME * 1000);
    } else {
      handleClearDialog();
    }
  }, [callingData, dispatch]);

  const handleStartCall = () => {
    handleClearDialog();
    dispatch(putStartCallRequest({ messageId: callingData?.dialogId }));
  };

  const handleStopCall = () => {
    handleClearDialog();
    dispatch(putStopCallRequest({ messageId: callingData?.dialogId }));
  };

  return (
    <Modal
      isOpen={!!callingData}
      size="sm"
      hideHeader
      hideFooter
      className="select-none flex justify-center py-5"
    >
      <audio src={ringtone} ref={ringtoneRef} />
      <div className="flex justify-center">
        <img
          className="w-40 h-40 rounded-full"
          src={callingData?.sender?.avatar}
          alt="user"
        />
      </div>
      <div className="text-center text-lg font-bold my-5">
        {`${getFullname(
          callingData?.sender?.firstName,
          callingData?.sender?.middleName,
          callingData?.sender?.lastName,
        )} ${t('chat.call.is_calling')}`}
      </div>
      <div className="flex justify-center">
        <div className="flex">
          <Button
            buttonClassName="mr-5 text-white bg-green-500 hover:bg-green-400"
            variant="circle"
            icon={faPhoneAlt}
            onClick={handleStartCall}
          />
          <Button
            buttonClassName="text-white bg-red-500 hover:bg-red-400"
            variant="circle"
            icon={faPhoneSlash}
            onClick={handleStopCall}
          />
        </div>
      </div>
    </Modal>
  );
};
