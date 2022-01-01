import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadphones,
  faMicrophone,
  faVideo,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'components/Modal';

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

type SettingPage = 'microphone' | 'speaker' | 'camera';

export const SettingDeviceModal = ({ isOpen, onClose }: IProps) => {
  const [settingPage, setSettingPage] = useState<SettingPage>('microphone');

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
      <div className="flex">
        <div className="w-1/3">
          <SettingCard
            icon={faMicrophone}
            text={t(
              'setting.system.options.setting_devices.buttons.microphone',
            )}
            isSelected={settingPage === 'microphone'}
            onClick={() => setSettingPage('microphone')}
          />
          <SettingCard
            icon={faHeadphones}
            text={t('setting.system.options.setting_devices.buttons.speaker')}
            isSelected={settingPage === 'speaker'}
            onClick={() => setSettingPage('speaker')}
            className="my-2"
          />
          <SettingCard
            icon={faVideo}
            text={t('setting.system.options.setting_devices.buttons.camera')}
            isSelected={settingPage === 'camera'}
            onClick={() => setSettingPage('camera')}
          />
        </div>
        <div className="w-2/3 pl-2">b</div>
      </div>
    </Modal>
  );
};
