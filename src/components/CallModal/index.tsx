import { useCallback, useContext, useState } from 'react';
import { Modal } from 'components/Modal';
import { useWindowDimension } from 'hooks/useWindowDimension';
import { LocalMediaContext } from 'pages/Homepage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophone,
  faMicrophoneSlash,
  faPhone,
  faVideo,
  faVideoSlash,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { getFullname } from 'utils/getFullname';
import { useTranslation } from 'react-i18next';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const CALL_MODAL_WIDTH = 800;
const CALL_MODAL_HEIGHT = 600;

export const CallModal = ({ isOpen, onClose }: IProps) => {
  const [remoteCameraOn] = useState<boolean>(false);
  const [isOpenClosePopup, setIsOpenClosePopup] = useState<boolean>(false);

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { selectedContactId, activeContacts } = useSelector(
    (state: RootState) => state.contact,
  );

  const { t } = useTranslation();

  const {
    isGettingStream,
    mirrorVideo,
    videoStreamTrack,
    canvasStreamTrack,
    highFrameRate,
    cameraOn,
    microphoneOn,
    onToggleCamera,
    onToggleMicrophone,
    stopMediaStream,
  } = useContext(LocalMediaContext);

  const { width: windowWidth, height: windowHeight } = useWindowDimension();

  const handleEndCall = () => {
    setIsOpenClosePopup(false);
    stopMediaStream();
    onClose();
  };

  const handleOpenSettingDeviceModal = () => {};

  const getModalSize = useCallback(
    (ratio: number = 1) => {
      let width: number;
      let height: number;

      const CALL_MODAL_RATIO = CALL_MODAL_WIDTH / CALL_MODAL_HEIGHT;
      if (
        windowWidth >= CALL_MODAL_WIDTH &&
        windowHeight >= CALL_MODAL_HEIGHT
      ) {
        width = CALL_MODAL_WIDTH;
        height = CALL_MODAL_HEIGHT;
      } else if (windowWidth / windowHeight > CALL_MODAL_RATIO) {
        width = windowHeight * CALL_MODAL_RATIO;
        height = windowHeight;
      } else {
        width = windowWidth;
        height = windowWidth / CALL_MODAL_RATIO;
      }

      return { width: `${width * ratio}px`, height: `${height * ratio}px` };
    },
    [windowWidth, windowHeight],
  );

  const localVideoRef = useCallback(
    (video: HTMLVideoElement) => {
      if (video && videoStreamTrack && canvasStreamTrack) {
        video.srcObject = new MediaStream([
          highFrameRate ? videoStreamTrack : canvasStreamTrack,
        ]);
        video.play();
      }
    },
    [videoStreamTrack, canvasStreamTrack, highFrameRate],
  );

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="auto"
      notPadding
      hideHeader
      hideFooter
      className="select-none"
    >
      <div style={getModalSize()} className="relative w-full h-full rounded-md">
        <video
          playsInline
          className={clsx(
            { hidden: !remoteCameraOn },
            'w-full h-full rounded-md',
          )}
        />
        {!remoteCameraOn && (
          <div className="absolute inset-0 rounded-md flex justify-center items-center text-2xl text-blue-500">
            <FontAwesomeIcon icon={faVideoSlash} />
          </div>
        )}
        <div style={getModalSize(1 / 4)} className="absolute bottom-2 right-2">
          <video
            ref={localVideoRef}
            playsInline
            className={clsx(
              { hidden: !cameraOn || isGettingStream },
              { 'transform scale-x-flip': mirrorVideo },
              'w-full h-full rounded-md',
            )}
          />
          {!cameraOn && (
            <div className="absolute inset-0 rounded-md bg-blue-200 flex justify-center items-center text-lg text-blue-500">
              <FontAwesomeIcon icon={faVideoSlash} />
            </div>
          )}
          {isGettingStream && (
            <div className="absolute inset-0 rounded-md bg-blue-200 flex justify-center items-center text-lg text-blue-500">
              <Spinner />
            </div>
          )}
        </div>
        <div className="absolute bottom-5 inset-x-0 flex justify-center">
          <div className="flex justify-evenly w-80">
            <Button
              variant="circle"
              icon={cameraOn ? faVideo : faVideoSlash}
              hasOnlyButton={false}
              onClick={onToggleCamera}
            />
            <Button
              variant="circle"
              icon={microphoneOn ? faMicrophone : faMicrophoneSlash}
              hasOnlyButton={false}
              onClick={onToggleMicrophone}
            />
            <Button
              variant="circle"
              icon={faPhone}
              hasOnlyButton={false}
              color="danger"
              onClick={() => setIsOpenClosePopup(true)}
            />
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 p-2 flex justify-between">
          <div className={clsx({ 'text-white': remoteCameraOn }, 'flex h-9')}>
            <img
              src={selectedUser.avatar}
              alt="logo"
              className="w-9 h-9 rounded-full"
            />
            <div className="flex flex-col justify-between ml-2">
              <div className="font-semibold text-xs">
                {getFullname(
                  selectedUser.firstName,
                  selectedUser.middleName,
                  selectedUser.lastName,
                )}
              </div>
              <div className="text-gray-400 text-xs">00:00:00</div>
            </div>
          </div>
          <Button
            variant="circle"
            icon={faWrench}
            hasOnlyButton={false}
            onClick={handleOpenSettingDeviceModal}
          />
        </div>
        {isOpenClosePopup && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-blue-200 rounded-md shadow-md">
              <div className="p-2">{t('chat.call.confirm_end_call')}</div>
              <div className="flex">
                <button
                  onClick={handleEndCall}
                  className="w-1/2 p-1 border-t border-r rounded-bl-md transition duration-150 hover:bg-blue-300"
                >
                  {t('chat.call.confirm')}
                </button>
                <button
                  onClick={() => setIsOpenClosePopup(false)}
                  className="w-1/2 p-1 border-t rounded-br-md transition duration-150 hover:bg-blue-300"
                >
                  {t('chat.call.cancel')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
