import { useCallback, useContext } from 'react';
import clsx from 'clsx';
import { LocalMediaContext } from 'pages/Homepage';
import { Select } from 'components/Select';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from './components/Checkbox';

interface IProps {
  isSelected: boolean;
}

export const VideoSetting = ({ isSelected }: IProps) => {
  const {
    videoStreamTrack,
    canvasStreamTrack,
    mirrorVideo,
    highFrameRate,
    cameras,
    selectedCamera,
    cameraPermissionGranted,
    cameraPermissionDenied,
    isGettingStream,
    onChangeCamera,
    onToggleMirrorVideo,
    onToggleHighFrameRate,
  } = useContext(LocalMediaContext);

  const { t } = useTranslation();

  const handleVideoRef = useCallback(
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

  const getCameraSelection = () => {
    if (!cameraPermissionGranted || cameraPermissionDenied) {
      return [
        {
          label: t('setting.system.options.setting_devices.block_camera'),
          value: '',
        },
      ];
    }

    return cameras.length
      ? cameras.map(device => ({
          label: device.label,
          value: device.deviceId,
        }))
      : [
          {
            label: t('setting.system.options.setting_devices.no_camera'),
            value: '',
          },
        ];
  };

  return (
    <div className={clsx({ hidden: !isSelected })}>
      <div className="relative mb-2 rounded-md aspect-w-4 aspect-h-3">
        <video
          muted
          playsInline
          className={clsx(
            {
              hidden: !videoStreamTrack || isGettingStream,
            },
            { 'transform scale-x-flip': mirrorVideo },
            'w-full h-full rounded-md',
          )}
          ref={handleVideoRef}
        />
        {(isGettingStream || !videoStreamTrack) && (
          <div className="absolute inset-0 rounded-md bg-blue-100 flex justify-center items-center">
            {isGettingStream ? (
              <Spinner />
            ) : (
              <FontAwesomeIcon icon={faVideoSlash} className="text-blue-500" />
            )}
          </div>
        )}
      </div>
      <Select
        isFullWidth
        hasBorder
        value={selectedCamera ? selectedCamera.deviceId : ''}
        options={getCameraSelection()}
        onChange={selectedDeviceId =>
          onChangeCamera(
            cameras.find(device => device.deviceId === selectedDeviceId),
          )
        }
        className="my-2"
      />
      <Checkbox
        id="mirror_video"
        text={t('setting.system.options.setting_devices.mirror_video')}
        checked={mirrorVideo}
        onChange={onToggleMirrorVideo}
      />
      <Checkbox
        id="high_quality"
        text={t('setting.system.options.setting_devices.high_quality')}
        checked={highFrameRate}
        onChange={onToggleHighFrameRate}
      />
    </div>
  );
};
