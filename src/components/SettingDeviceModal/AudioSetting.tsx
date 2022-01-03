import { useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'components/Select';
import { LocalMediaContext } from 'pages/Homepage';
import { useTranslation } from 'react-i18next';
import { MicrophoneProgressBar } from './components/MicrophoneProgressBar';
import { Button } from './components/Button';
import { AUDIO_RECORD } from 'constants/audio';

// @ts-ignore
import testAudioLink from 'assets/audio/sound.mp3';

interface IProps {
  isSelected: boolean;
}

interface CustomMediaRecorder {
  recorder: MediaRecorder;
  endedAt?: number;
}

type TestMicStatusType = 'test_microphone' | 'recording' | 'playing';

export const AudioSetting = ({ isSelected }: IProps) => {
  const {
    audioStreamTrack,
    microphones,
    speakers,
    selectedSpeaker,
    selectedMicrophone,
    microphoneOn,
    microphonePermissionGranted,
    microphonePermissionDenied,
    onChangeMicrophone,
    onChangeSpeaker,
  } = useContext(LocalMediaContext);

  const [testMicStatus, setTestMicStatus] =
    useState<TestMicStatusType>('test_microphone');
  const [mediaRecorder, setMediaRecorder] = useState<CustomMediaRecorder>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [notSupportMediaRecorder, setNotSupportMediaRecorder] =
    useState<boolean>(false);
  const [isTestingSpeaker, setIsTestingSpeaker] = useState<boolean>(false);

  const recordAudioRef = useRef<HTMLAudioElement>(null);
  const testAudioRef = useRef<HTMLAudioElement>(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (window.MediaRecorder) {
      if (audioStreamTrack) {
        const recorder = new MediaRecorder(new MediaStream([audioStreamTrack]));
        setMediaRecorder({ recorder });
      }
    } else {
      setNotSupportMediaRecorder(true);
    }
  }, [audioStreamTrack]);

  useEffect(() => {
    if (
      'sinkId' in HTMLMediaElement.prototype &&
      recordAudioRef.current &&
      testAudioRef.current &&
      selectedSpeaker?.deviceId
    ) {
      // @ts-ignore
      recordAudioRef.current.setSinkId(selectedSpeaker.deviceId);
      // @ts-ignore
      testAudioRef.current.setSinkId(selectedSpeaker.deviceId);
    }
  }, [selectedSpeaker]);

  const handleTestMicrophone = () => {
    if (recordAudioRef?.current && mediaRecorder) {
      const handleReset = () => {
        setTestMicStatus('test_microphone');
        setChunks([]);
        if (recordAudioRef?.current) {
          recordAudioRef.current.pause();
          recordAudioRef.current.currentTime = 0;
        }
      };

      if (testMicStatus === 'test_microphone') {
        try {
          setTestMicStatus('recording');
          mediaRecorder.recorder.ondataavailable = e => {
            chunks.push(e.data);
          };
          mediaRecorder.recorder.onstop = () => {
            const blob = new Blob(chunks, {
              type: mediaRecorder.recorder.mimeType,
            });
            const audioURL = URL.createObjectURL(blob);
            recordAudioRef.current.src = audioURL;

            recordAudioRef.current.play();
            setTestMicStatus('playing');

            recordAudioRef.current.onended = () => {
              handleReset();
            };
          };
          mediaRecorder.endedAt =
            Date.now() + AUDIO_RECORD.RECORD_DURATION_TIME;
          mediaRecorder.recorder.start();

          setTimeout(() => {
            const measurementError = Math.abs(
              Date.now() - mediaRecorder.endedAt,
            );
            if (
              mediaRecorder.recorder.state === 'recording' &&
              measurementError < AUDIO_RECORD.MAXIMUM_MEASUREMENT_ERROR_TIME
            ) {
              mediaRecorder.recorder.stop();
            }
          }, AUDIO_RECORD.RECORD_DURATION_TIME);
        } catch {
          handleReset();
        }
      } else if (testMicStatus === 'recording') {
        mediaRecorder.recorder.stop();
      } else {
        handleReset();
      }
    }
  };

  const handleTestSpeaker = () => {
    if (testAudioRef.current) {
      setIsTestingSpeaker(true);
      testAudioRef.current.play();
      testAudioRef.current.onended = () => {
        setIsTestingSpeaker(false);
      };
    }
  };

  const getMicrophoneSelection = () => {
    if (!microphonePermissionGranted || microphonePermissionDenied) {
      return [
        {
          label: t('setting.system.options.setting_devices.block_microphone'),
          value: '',
        },
      ];
    }

    return microphones.length
      ? microphones.map(device => ({
          label: device.label,
          value: device.deviceId,
        }))
      : [
          {
            label: t('setting.system.options.setting_devices.no_microphone'),
            value: '',
          },
        ];
  };

  const getSpeakerSelection = () => {
    return speakers.length
      ? speakers.map(device => ({
          label: device.label,
          value: device.deviceId,
        }))
      : [
          {
            label: t('setting.system.options.setting_devices.no_speaker'),
            value: '',
          },
        ];
  };

  return (
    <div className={clsx({ hidden: !isSelected })}>
      <audio className="hidden" ref={recordAudioRef} />
      <audio className="hidden" ref={testAudioRef}>
        <source src={testAudioLink} type="audio/mpeg" />
      </audio>
      <div className="font-semibold mt-2 mb-2">
        {t('setting.system.options.setting_devices.microphone')}
      </div>
      <Select
        isFullWidth
        hasBorder
        value={selectedMicrophone ? selectedMicrophone.deviceId : ''}
        options={getMicrophoneSelection()}
        onChange={selectedDeviceId =>
          onChangeMicrophone(
            microphones.find(device => device.deviceId === selectedDeviceId),
          )
        }
        disabled={
          microphonePermissionDenied || !microphones.length || !microphoneOn
        }
      />
      <MicrophoneProgressBar audioTrack={audioStreamTrack} className="my-2" />
      <Button
        text={
          testMicStatus === 'test_microphone'
            ? t(
                'setting.system.options.setting_devices.buttons.test_microphone',
              )
            : testMicStatus === 'playing'
            ? t('setting.system.options.setting_devices.buttons.playing')
            : t('setting.system.options.setting_devices.buttons.recording')
        }
        disabled={notSupportMediaRecorder || !audioStreamTrack}
        onClick={handleTestMicrophone}
      />
      <div className="font-semibold mt-6 mb-2">
        {t('setting.system.options.setting_devices.speaker')}
      </div>
      <Select
        isFullWidth
        hasBorder
        value={selectedSpeaker ? selectedSpeaker.deviceId : ''}
        options={getSpeakerSelection()}
        onChange={selectedDeviceId =>
          onChangeSpeaker(
            speakers.find(device => device.deviceId === selectedDeviceId),
          )
        }
      />
      <Button
        text={t('setting.system.options.setting_devices.buttons.test_speaker')}
        disabled={isTestingSpeaker}
        onClick={handleTestSpeaker}
        className="mt-2"
      />
    </div>
  );
};
