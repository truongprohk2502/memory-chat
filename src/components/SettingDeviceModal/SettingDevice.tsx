import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faHeadphones, faVideo } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'components/Spinner';
import { LocalMediaContext } from 'pages/Homepage';
import { AudioSetting } from './AudioSetting';
import { SettingCard } from './components/SettingCard';
import { VideoSetting } from './VideoSetting';

type SettingPage = 'audio' | 'video';

export const SettingDevice = () => {
  const [settingPage, setSettingPage] = useState<SettingPage>('audio');

  const { t } = useTranslation();

  const { initializedLocalStream, isGettingStream } =
    useContext(LocalMediaContext);

  return (
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
        <div className="absolute inset-0 bg-white dark:bg-gray-900 flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
