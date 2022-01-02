import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadphones,
  faVideo,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'components/Modal';
import { AudioSetting } from './AudioSetting';
import { VideoSetting } from './VideoSetting';
import { Spinner } from 'components/Spinner';
import { LocalMediaContext } from 'pages/Homepage';

interface ISettingCardProps {
  icon: IconDefinition;
  text: string;
  isSelected: boolean;
  className?: string;
  onClick: () => void;
}

const SettingCard = ({
  icon,
  text,
  isSelected,
  className = '',
  onClick,
}: ISettingCardProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        { 'hover:bg-blue-400': !isSelected },
        { 'bg-blue-500': isSelected },
        `flex rounded-md group cursor-pointer transition duration-150 ${className}`,
      )}
    >
      <div className="w-10">
        <div
          className={clsx(
            { 'bg-blue-300 group-hover:bg-blue-400': !isSelected },
            'w-8 h-8 rounded-lg flex justify-center items-center',
          )}
        >
          <FontAwesomeIcon
            icon={icon}
            className={clsx(
              { 'text-blue-500 group-hover:text-white': !isSelected },
              { 'text-white': isSelected },
              'transition duration-150',
            )}
          />
        </div>
      </div>
      <div
        className={clsx(
          { 'group-hover:text-white': !isSelected },
          { 'text-white': isSelected },
          'flex-auto flex items-center transition duration-150',
        )}
      >
        {text}
      </div>
    </div>
  );
};

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingPage = 'audio' | 'video';

export const SettingDeviceModal = ({ isOpen, onClose }: IProps) => {
  const [settingPage, setSettingPage] = useState<SettingPage>('audio');

  const { initializedLocalStream, isGettingStream } =
    useContext(LocalMediaContext);

  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title="Setting devices"
      hideFooter
      className="select-none"
    >
      <div className="flex relative">
        <div className="w-1/3">
          <SettingCard
            icon={faHeadphones}
            text={t(
              'setting.system.options.setting_devices.buttons.audio_setting',
            )}
            isSelected={settingPage === 'audio'}
            onClick={() => setSettingPage('audio')}
            className="my-2"
          />
          <SettingCard
            icon={faVideo}
            text={t(
              'setting.system.options.setting_devices.buttons.video_setting',
            )}
            isSelected={settingPage === 'video'}
            onClick={() => setSettingPage('video')}
          />
        </div>
        <div className="w-2/3 pl-5 min-h-100">
          <AudioSetting isSelected={settingPage === 'audio'} />
          <VideoSetting isSelected={settingPage === 'video'} />
        </div>
        {!initializedLocalStream && isGettingStream && (
          <div className="absolute inset-0 bg-white flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>
    </Modal>
  );
};
