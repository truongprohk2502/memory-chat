import { useCallback, useContext, useEffect, useState } from 'react';
import { Modal } from 'components/Modal';
import { useWindowDimension } from 'hooks/useWindowDimension';
import { LocalMediaContext } from 'pages/Homepage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophone,
  faMicrophoneSlash,
  faPhoneAlt,
  faPhoneSlash,
  faTimes,
  faVideo,
  faVideoSlash,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';
import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { RootState } from 'reducers';
import { getFullname } from 'utils/getFullname';
import { useTranslation } from 'react-i18next';
import { SettingDevice } from 'components/SettingDeviceModal/SettingDevice';
import CallingProgressBar from './components/CallingProgressBar';
import { postDialogMessageRequest } from 'reducers/message';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export type CallStatus = 'ready' | 'calling' | 'talking' | 'ended';

const CALL_MODAL_WIDTH = 800;
const CALL_MODAL_HEIGHT = 600;

export const CallModal = ({ isOpen, onClose }: IProps) => {
  const [remoteCameraOn] = useState<boolean>(false);
  const [isOpenClosePopup, setIsOpenClosePopup] = useState<boolean>(false);
  const [isOpenSettingPage, setIsOpenSettingPage] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<CallStatus>('ready');
  const [postingDialogMessage, setPostingDialogMessage] =
    useState<boolean>(false);

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { selectedContactId, activeContacts } = useSelector(
    (state: RootState) => state.contact,
  );
  const { pendingPostDialogMessage, errorPostDialogMessage } = useSelector(
    (state: RootState) => state.message,
  );

  const dispatch = useDispatch();
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

  useEffect(() => {
    if (
      postingDialogMessage &&
      !pendingPostDialogMessage &&
      !errorPostDialogMessage
    ) {
      setPostingDialogMessage(false);
      setCallStatus('calling');
    }
  }, [postingDialogMessage, pendingPostDialogMessage, errorPostDialogMessage]);

  const handleEndCall = () => {
    setIsOpenClosePopup(false);
    stopMediaStream();
    onClose();
  };

  const handleEndedDialog = () => {
    setCallStatus('ready');
  };

  const handleStartDialog = () => {
    dispatch(postDialogMessageRequest({ contactId: selectedContactId }));
    setPostingDialogMessage(true);
  };

  const handleStopDialog = () => {
    setCallStatus('ready');
  };

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
        {callStatus === 'talking' && !remoteCameraOn && (
          <div className="absolute inset-0 rounded-md flex justify-center items-center text-2xl text-blue-500">
            <FontAwesomeIcon icon={faVideoSlash} />
          </div>
        )}
        <div
          className={clsx(
            { hidden: callStatus !== 'ready' && callStatus !== 'calling' },
            'absolute inset-0 flex flex-col justify-center items-center',
          )}
        >
          <div className="w-40 h-40 mb-5">
            <CallingProgressBar
              callStatus={callStatus}
              onEndedDialog={handleEndedDialog}
            >
              <img
                src={selectedUser?.avatar}
                alt="logo"
                className="w-36 h-36 rounded-full"
              />
            </CallingProgressBar>
          </div>
          <Button
            icon={callStatus === 'calling' ? faPhoneSlash : faPhoneAlt}
            text={
              callStatus === 'calling'
                ? t('chat.call.stop_call')
                : t('chat.call.call')
            }
            color={callStatus === 'calling' ? 'danger' : 'primary'}
            disabled={!microphoneOn}
            onClick={
              callStatus === 'calling' ? handleStopDialog : handleStartDialog
            }
          />
        </div>
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
        <div
          className={clsx(
            { hidden: callStatus === 'calling' },
            'absolute bottom-5 inset-x-0 flex justify-center',
          )}
        >
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
              icon={faPhoneSlash}
              hasOnlyButton={false}
              color="danger"
              onClick={() => setIsOpenClosePopup(true)}
            />
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 p-2 flex justify-between">
          <div className={clsx({ 'text-white': remoteCameraOn }, 'flex h-9')}>
            <img
              src={selectedUser?.avatar}
              alt="logo"
              className="w-9 h-9 rounded-full"
            />
            <div className="flex flex-col justify-between ml-2">
              <div className="font-semibold text-xs">
                {getFullname(
                  selectedUser?.firstName,
                  selectedUser?.middleName,
                  selectedUser?.lastName,
                )}
              </div>
              <div className="text-gray-400 text-xs">00:00:00</div>
            </div>
          </div>
          <Button
            variant="circle"
            icon={faWrench}
            hasOnlyButton={false}
            onClick={() => setIsOpenSettingPage(true)}
          />
        </div>
        {isOpenClosePopup && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-blue-200 rounded-md shadow-md dark:text-black">
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
        {isOpenSettingPage && (
          <div className="absolute inset-0 rounded-md bg-white dark:bg-gray-900">
            <div className="absolute top-0 right-0 p-2">
              <Button
                variant="circle"
                icon={faTimes}
                hasOnlyButton={false}
                onClick={() => setIsOpenSettingPage(false)}
              />
            </div>
            <div className="absolute inset-x-16 inset-y-20">
              <SettingDevice />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
