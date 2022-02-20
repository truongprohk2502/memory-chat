import { useEffect } from 'react';
import { faPhoneAlt, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { getFullname } from 'utils/getFullname';
import { DIALOG_TIME } from 'constants/call';
import { putStopCallRequest } from 'reducers/message';

var stopCallTimeout;

export const DialogModal = () => {
  const { callingData } = useSelector((state: RootState) => state.message);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (callingData) {
      stopCallTimeout = setTimeout(() => {
        dispatch(putStopCallRequest({ messageId: callingData.dialogId }));
      }, DIALOG_TIME * 1000);
    } else {
      clearTimeout(stopCallTimeout);
    }
  }, [callingData, dispatch]);

  const handleStopCall = () => {
    clearTimeout(stopCallTimeout);
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
            onClick={() => {}}
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
