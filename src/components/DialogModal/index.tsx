import { useEffect } from 'react';
import { faPhoneAlt, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { getFullname } from 'utils/getFullname';
import { DIALOG_TIME } from 'constants/call';
import { setCallingUser } from 'reducers/message';

export const DialogModal = () => {
  const { callingUser } = useSelector((state: RootState) => state.message);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (callingUser) {
      setTimeout(() => {
        dispatch(setCallingUser(null));
      }, DIALOG_TIME * 1000);
    }
  }, [callingUser, dispatch]);

  return (
    <Modal
      isOpen={!!callingUser}
      size="sm"
      hideHeader
      hideFooter
      className="select-none flex justify-center py-5"
    >
      <div className="flex justify-center">
        <img
          className="w-40 h-40 rounded-full"
          src={callingUser?.avatar}
          alt="user"
        />
      </div>
      <div className="text-center text-lg font-bold my-5">
        {`${getFullname(
          callingUser?.firstName,
          callingUser?.middleName,
          callingUser?.lastName,
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
            onClick={() => {}}
          />
        </div>
      </div>
    </Modal>
  );
};
