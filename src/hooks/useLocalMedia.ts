import { useCallback, useEffect, useState } from 'react';
import {
  getAudioConstraints,
  getDevices,
  getMediaData,
  getMediaStream,
  getMediaStreamFromTracks,
  getVideoConstraints,
} from 'utils/getMediaData';
import {
  getAdvanceMediaSetting,
  setAdvanceMediaSetting,
  setCamAndMicState,
  setMediaDeviceSetting,
} from 'utils/storage';
import { TIMEOUT } from 'constants/timeout';
import { useCanvasStream } from './useCanvasStream';

interface IAbortController {
  aborted: boolean;
}

let abortControllers: IAbortController[] = [];

export interface ICamAndMic {
  cameraOn: boolean;
  microphoneOn: boolean;
}

export type PageType = 'preview' | 'talk' | 'homepage';

export interface ILocalMedia {
  initializedLocalStream: boolean;
  isOnBackground: boolean;
  isGettingStream: boolean;
  cameraPermissionGranted: boolean;
  microphonePermissionGranted: boolean;
  cameraPermissionDenied: boolean;
  microphonePermissionDenied: boolean;
  mirrorVideo: boolean;
  highFrameRate: boolean;
  cameraOn: boolean;
  microphoneOn: boolean;
  localStream: MediaStream;
  canvasStreamTrack: MediaStreamTrack;
  videoStreamTrack: MediaStreamTrack;
  audioStreamTrack: MediaStreamTrack;
  cameras: MediaDeviceInfo[];
  microphones: MediaDeviceInfo[];
  speakers: MediaDeviceInfo[];
  selectedCamera: MediaDeviceInfo;
  selectedMicrophone: MediaDeviceInfo;
  selectedSpeaker: MediaDeviceInfo;
  onPermission: () => void;
  onToggleCamera: () => void;
  onToggleMicrophone: () => void;
  onToggleHighFrameRate: () => void;
  onToggleMirrorVideo: () => void;
  onChangeCamera: (deviceInfo: MediaDeviceInfo) => void;
  onChangeMicrophone: (deviceInfo: MediaDeviceInfo) => void;
  onChangeSpeaker: (deviceInfo: MediaDeviceInfo) => void;
  onError: () => void;
  stopMediaStream: () => void;
  startMediaStream: () => void;
}

export const useLocalMedia = (
  pageType: PageType,
  requireCamera: boolean,
): ILocalMedia => {
  const [initializedLocalStream, setInitializedLocalStream] =
    useState<boolean>(false);
  const [isOnBackground, setIsOnBackground] = useState<boolean>(true);
  const [isGettingStream, setIsGettingStream] = useState<boolean>(false);

  const [cameraPermissionGranted, setCameraPermissionGranted] =
    useState<boolean>(false);
  const [microphonePermissionGranted, setMicrophonePermissionGranted] =
    useState<boolean>(false);
  const [cameraPermissionDenied, setCameraPermissionDenied] =
    useState<boolean>(false);
  const [microphonePermissionDenied, setMicrophonePermissionDenied] =
    useState<boolean>(false);

  const [cameraOn, setCameraOn] = useState<boolean>(false);
  const [microphoneOn, setMicrophoneOn] = useState<boolean>(false);

  const [localStream, setLocalStream] = useState<MediaStream>(null);
  const [audioStreamTrack, setAudioStreamTrack] =
    useState<MediaStreamTrack>(null);
  const [videoStreamTrack, setVideoStreamTrack] =
    useState<MediaStreamTrack>(null);

  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);

  const [selectedCamera, setSelectedCamera] = useState<MediaDeviceInfo>(null);
  const [selectedMicrophone, setSelectedMicrophone] =
    useState<MediaDeviceInfo>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<MediaDeviceInfo>(null);

  const [mirrorVideo, setMirrorVideo] = useState<boolean>(true);
  const [highFrameRate, setHighFrameRate] = useState<boolean>(true);

  const canvasStreamTrack = useCanvasStream(videoStreamTrack);

  useEffect(() => {
    const advanceMediaSetting = getAdvanceMediaSetting();
    if (advanceMediaSetting) {
      const { highFrameRate, mirrorVideo } = advanceMediaSetting;
      setHighFrameRate(highFrameRate);
      setMirrorVideo(mirrorVideo);
    }
  }, []);

  useEffect(() => {
    if (navigator.permissions) {
      let microphonePermission: PermissionStatus;
      let cameraPermission: PermissionStatus;

      const handleListenChangeMicrophonePermission = () => {
        if (microphonePermission.state === 'denied') {
          setMicrophoneOn(false);
          setAudioStreamTrack(null);
          setMicrophonePermissionDenied(true);
          setMicrophonePermissionGranted(false);
        } else if (microphonePermission.state === 'granted') {
          setMicrophonePermissionDenied(false);
          setMicrophonePermissionGranted(true);
        } else {
          setMicrophonePermissionDenied(false);
          setMicrophonePermissionGranted(false);
        }
      };

      const handleListenChangeCameraPermission = () => {
        if (cameraPermission.state === 'denied') {
          setCameraOn(false);
          setVideoStreamTrack(null);
          setCameraPermissionDenied(true);
          setCameraPermissionGranted(false);
        } else if (cameraPermission.state === 'granted') {
          setCameraPermissionDenied(false);
          setCameraPermissionGranted(true);
        } else {
          setCameraPermissionDenied(false);
          setCameraPermissionGranted(false);
        }
      };

      const handleListenChangePermission = async () => {
        microphonePermission = await navigator.permissions
          // @ts-ignore
          .query({ name: 'microphone' });

        handleListenChangeMicrophonePermission();

        microphonePermission.addEventListener(
          'change',
          handleListenChangeMicrophonePermission,
        );

        cameraPermission = await navigator.permissions
          // @ts-ignore
          .query({ name: 'camera' });

        handleListenChangeCameraPermission();

        cameraPermission.addEventListener(
          'change',
          handleListenChangeCameraPermission,
        );
      };

      handleListenChangePermission();

      return () => {
        microphonePermission &&
          microphonePermission.removeEventListener(
            'change',
            handleListenChangeMicrophonePermission,
          );

        cameraPermission &&
          cameraPermission.removeEventListener(
            'change',
            handleListenChangeCameraPermission,
          );
      };
    }
  }, []);

  useEffect(() => {
    let updateTimeoutFunc;
    const autoUpdateDevices = async () => {
      updateTimeoutFunc && clearTimeout(updateTimeoutFunc);
      updateTimeoutFunc = setTimeout(async () => {
        abortControllers.length &&
          abortControllers.forEach(abortController => {
            if (!abortController.aborted) {
              abortController.aborted = true;
            }
          });

        const newAbortController: IAbortController = { aborted: false };
        abortControllers.push(newAbortController);

        const {
          microphones: newMicrophones,
          cameras: newCameras,
          speakers: newSpeakers,
        } = await getDevices();

        let selectedNewCamera;
        let selectedNewMicrophone;
        let selectedNewSpeaker;

        let cameraChanged: boolean;
        let microphoneChanged: boolean;
        let speakerChanged: boolean;

        const alreadyDisconnectedCameras = !cameras.every(device =>
          newCameras.map(device => device.deviceId).includes(device.deviceId),
        )
          ? cameras.filter(
              device =>
                !newCameras
                  .map(device => device.deviceId)
                  .includes(device.deviceId),
            )
          : [];

        const alreadyDisconnectedMicrophones = !microphones.every(device =>
          newMicrophones
            .map(device => device.deviceId)
            .includes(device.deviceId),
        )
          ? microphones.filter(
              device =>
                !newMicrophones
                  .map(device => device.deviceId)
                  .includes(device.deviceId),
            )
          : [];

        const alreadyConnectedCameras = !newCameras.every(device =>
          cameras.map(device => device.deviceId).includes(device.deviceId),
        )
          ? newCameras.filter(
              device =>
                !cameras
                  .map(device => device.deviceId)
                  .includes(device.deviceId),
            )
          : [];

        const alreadyConnectedMicrophones = !newMicrophones.every(device =>
          microphones.map(device => device.deviceId).includes(device.deviceId),
        )
          ? newMicrophones.filter(device => {
              if (device.deviceId === 'default') {
                const oldDefaultMicrophone = microphones.find(
                  device => device.deviceId === 'default',
                );
                return oldDefaultMicrophone
                  ? oldDefaultMicrophone.groupId !== device.groupId
                  : true;
              } else if (device.deviceId === 'communications') {
                const oldCommunicationMicrophone = microphones.find(
                  device => device.deviceId === 'communications',
                );
                return oldCommunicationMicrophone
                  ? oldCommunicationMicrophone.groupId !== device.groupId
                  : true;
              } else {
                return !microphones
                  .map(device => device.deviceId)
                  .includes(device.deviceId);
              }
            })
          : [];

        const alreadyConnectedSpeakers = !newSpeakers.every(device =>
          speakers.map(device => device.deviceId).includes(device.deviceId),
        )
          ? newSpeakers.filter(device => {
              if (device.deviceId === 'default') {
                const oldDefaultSpeaker = speakers.find(
                  device => device.deviceId === 'default',
                );
                return oldDefaultSpeaker
                  ? oldDefaultSpeaker.groupId !== device.groupId
                  : true;
              } else if (device.deviceId === 'communications') {
                const oldCommunicationSpeaker = speakers.find(
                  device => device.deviceId === 'communications',
                );
                return oldCommunicationSpeaker
                  ? oldCommunicationSpeaker.groupId !== device.groupId
                  : true;
              } else {
                return !speakers
                  .map(device => device.deviceId)
                  .includes(device.deviceId);
              }
            })
          : [];

        if (
          alreadyConnectedCameras.length ||
          !newCameras.find(
            device => device.deviceId === selectedCamera?.deviceId,
          )
        ) {
          cameraChanged = true;
          selectedNewCamera = alreadyConnectedCameras.length
            ? alreadyConnectedCameras[0]
            : newCameras?.[0];
        }

        if (
          alreadyConnectedMicrophones.length ||
          !newMicrophones.find(
            device =>
              device.deviceId === selectedMicrophone?.deviceId &&
              device.groupId === selectedMicrophone?.groupId,
          )
        ) {
          microphoneChanged = true;
          const newCommunicationMicrophone = alreadyConnectedMicrophones.find(
            device => device.deviceId === 'communications',
          );
          const newDefaultMicrophone = alreadyConnectedMicrophones.find(
            device => device.deviceId === 'default',
          );
          const communicationMicrophone = newMicrophones.find(
            device => device.deviceId === 'communications',
          );
          const defaultMicrophone = newMicrophones.find(
            device => device.deviceId === 'default',
          );
          if (newCommunicationMicrophone) {
            selectedNewMicrophone = newCommunicationMicrophone;
          } else if (newDefaultMicrophone) {
            selectedNewMicrophone = newDefaultMicrophone;
          } else if (alreadyConnectedMicrophones.length) {
            selectedNewMicrophone = alreadyConnectedMicrophones[0];
          } else if (communicationMicrophone) {
            selectedNewMicrophone = communicationMicrophone;
          } else if (defaultMicrophone) {
            selectedNewMicrophone = defaultMicrophone;
          } else if (newMicrophones.length) {
            selectedNewMicrophone = newMicrophones[0];
          }
        }

        if (
          alreadyConnectedSpeakers.length ||
          !newSpeakers.find(
            device =>
              device.deviceId === selectedSpeaker?.deviceId &&
              device.groupId === selectedSpeaker?.groupId,
          )
        ) {
          speakerChanged = true;
          const newCommunicationSpeaker = alreadyConnectedSpeakers.find(
            device => device.deviceId === 'communications',
          );
          const newDefaultSpeaker = alreadyConnectedSpeakers.find(
            device => device.deviceId === 'default',
          );
          const communicationSpeaker = newSpeakers.find(
            device => device.deviceId === 'communications',
          );
          const defaultSpeaker = newSpeakers.find(
            device => device.deviceId === 'default',
          );
          if (newCommunicationSpeaker) {
            selectedNewSpeaker = newCommunicationSpeaker;
          } else if (newDefaultSpeaker) {
            selectedNewSpeaker = newDefaultSpeaker;
          } else if (alreadyConnectedSpeakers.length) {
            selectedNewSpeaker = alreadyConnectedSpeakers[0];
          } else if (communicationSpeaker) {
            selectedNewSpeaker = communicationSpeaker;
          } else if (defaultSpeaker) {
            selectedNewSpeaker = defaultSpeaker;
          } else if (newSpeakers.length) {
            selectedNewSpeaker = newSpeakers[0];
          }
        }

        setSpeakers(newSpeakers);
        if (speakerChanged) {
          setSelectedSpeaker(selectedNewSpeaker);
        }

        setMediaDeviceSetting({
          microphoneDeviceId: selectedNewMicrophone?.deviceId,
          speakerDeviceId: selectedNewSpeaker?.deviceId,
          cameraDeviceId: selectedNewCamera?.deviceId,
        });

        if (!selectedNewCamera && !selectedNewMicrophone) return;

        const videoConstraints: MediaTrackConstraints | boolean =
          !cameraPermissionDenied && getVideoConstraints(selectedNewCamera);

        const audioConstraints: MediaTrackConstraints | boolean =
          !microphonePermissionDenied
            ? getAudioConstraints(selectedNewMicrophone)
            : false;

        if (isOnBackground) {
          setCameras(newCameras);
          setMicrophones(newMicrophones);

          cameraChanged && setSelectedCamera(selectedNewCamera);
          microphoneChanged && setSelectedMicrophone(selectedNewMicrophone);
        } else {
          if (videoConstraints || audioConstraints) {
            try {
              let cameraOn: boolean;
              let microphoneOn: boolean;

              if (videoConstraints) {
                setIsGettingStream(true);
                videoStreamTrack && videoStreamTrack.stop();
              }

              if (audioConstraints) {
                audioStreamTrack && audioStreamTrack.stop();
              }

              const clearAudioState = () => {
                setAudioStreamTrack(null);
                setMicrophoneOn(false);
              };

              const clearVideoState = () => {
                setVideoStreamTrack(null);
                setCameraOn(false);
              };

              const { audioTrack, videoTrack } = await getMediaStream(
                audioConstraints,
                videoConstraints,
              );

              setLocalStream(getMediaStreamFromTracks(videoTrack, audioTrack));

              if (audioConstraints) {
                if (audioTrack) {
                  setMicrophoneOn(prevMicrophoneOn => {
                    if (pageType === 'talk' && !prevMicrophoneOn) {
                      audioTrack.enabled = false;
                    }
                    microphoneOn = pageType !== 'talk' || prevMicrophoneOn;
                    return microphoneOn;
                  });
                  setAudioStreamTrack(audioTrack);
                } else {
                  clearAudioState();
                }
              } else if (alreadyDisconnectedMicrophones.length) {
                clearAudioState();
              }

              if (videoConstraints) {
                if (videoTrack) {
                  setCameraOn(prevCameraOn => {
                    if (pageType === 'talk' && !prevCameraOn) {
                      videoTrack.enabled = false;
                    }
                    cameraOn = pageType !== 'talk' || prevCameraOn;
                    return cameraOn;
                  });
                  setVideoStreamTrack(videoTrack);
                } else {
                  clearVideoState();
                }
              } else if (alreadyDisconnectedCameras.length) {
                clearVideoState();
              }

              setMediaDeviceSetting({
                microphoneDeviceId: selectedNewMicrophone?.deviceId,
                speakerDeviceId: selectedNewSpeaker?.deviceId,
                cameraDeviceId: selectedNewCamera?.deviceId,
              });

              setCameras(newCameras);
              setMicrophones(newMicrophones);

              cameraChanged && setSelectedCamera(selectedNewCamera);
              microphoneChanged && setSelectedMicrophone(selectedNewMicrophone);
              setCamAndMicState({ cameraOn, microphoneOn });

              abortControllers.splice(0, abortControllers.length);
            } catch (err) {
              onError();
            } finally {
              videoConstraints && setIsGettingStream(false);
            }
          } else {
            onError();
          }
        }
      }, TIMEOUT.DELAY_UPDATE_DEVICE);
    };

    if (navigator.mediaDevices.ondevicechange !== undefined) {
      navigator.mediaDevices.addEventListener(
        'devicechange',
        autoUpdateDevices,
      );

      return () => {
        navigator.mediaDevices.removeEventListener(
          'devicechange',
          autoUpdateDevices,
        );
      };
    }
  }, [
    pageType,
    audioStreamTrack,
    videoStreamTrack,
    isOnBackground,
    cameraPermissionDenied,
    microphonePermissionDenied,
    cameras,
    microphones,
    speakers,
    selectedCamera,
    selectedMicrophone,
    selectedSpeaker,
  ]);

  const onPermission = useCallback(async () => {
    setIsOnBackground(false);

    const {
      cameras,
      microphones,
      speakers,
      selectedCamera,
      selectedMicrophone,
      selectedSpeaker,
      localStream,
      audioTrack,
      videoTrack,
      microphonePermissionDenied,
      cameraPermissionDenied,
    } = await getMediaData({
      attemptMicrophonePermission: !microphonePermissionGranted,
      attemptCameraPermission: !cameraPermissionGranted,
      pageType,
      requireCamera,
      setIsLoading: setIsGettingStream,
    });

    setCamAndMicState({
      cameraOn: !!videoTrack,
      microphoneOn: !!audioTrack,
    });

    setMediaDeviceSetting({
      microphoneDeviceId: selectedMicrophone?.deviceId,
      speakerDeviceId: selectedSpeaker?.deviceId,
      cameraDeviceId: selectedCamera?.deviceId,
    });

    if (videoTrack) {
      setCameraPermissionGranted(true);
      setVideoStreamTrack(videoTrack);
      setCameraOn(true);
    }

    if (audioTrack) {
      setMicrophonePermissionGranted(true);
      setAudioStreamTrack(audioTrack);
      setMicrophoneOn(true);
    }

    setLocalStream(localStream);
    setCameraPermissionDenied(cameraPermissionDenied);
    setMicrophonePermissionDenied(microphonePermissionDenied);
    setCameras(cameras);
    setSelectedCamera(selectedCamera);
    setMicrophones(microphones);
    setSelectedMicrophone(selectedMicrophone);
    setSpeakers(speakers);
    setSelectedSpeaker(selectedSpeaker);
    setIsGettingStream(false);
    setInitializedLocalStream(true);
  }, [
    pageType,
    requireCamera,
    microphonePermissionGranted,
    cameraPermissionGranted,
  ]);

  const handleUpdateMicrophone = async (
    newMicrophones: MediaDeviceInfo[],
    microphoneDevice: MediaDeviceInfo,
  ) => {
    setMicrophones(newMicrophones);
    setSelectedMicrophone(microphoneDevice);
    setMediaDeviceSetting({
      microphoneDeviceId: microphoneDevice.deviceId,
      speakerDeviceId: selectedSpeaker?.deviceId,
      cameraDeviceId: selectedCamera?.deviceId,
    });

    if (microphonePermissionDenied) return;

    const handleGetAudioTrack = async (deviceInfo: MediaDeviceInfo) => {
      const audioConstraints = getAudioConstraints(deviceInfo);
      audioStreamTrack && audioStreamTrack.stop();
      const { audioTrack } = await getMediaStream(audioConstraints, false);

      if (localStream) {
        audioStreamTrack && localStream.removeTrack(audioStreamTrack);
        audioTrack && localStream.addTrack(audioTrack);
      } else {
        setLocalStream(getMediaStreamFromTracks(videoStreamTrack, audioTrack));
      }

      setAudioStreamTrack(audioTrack);
      setMicrophoneOn(true);
      !microphonePermissionGranted && setMicrophonePermissionGranted(true);
      microphonePermissionDenied && setMicrophonePermissionDenied(false);
    };

    try {
      await handleGetAudioTrack(microphoneDevice);
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setCamAndMicState({
          cameraOn,
          microphoneOn: false,
        });
        setMicrophoneOn(false);
        setMicrophonePermissionGranted(false);
        setMicrophonePermissionDenied(true);
      } else {
        onError();
      }
    } finally {
      setIsGettingStream(false);
    }
  };

  const handleUpdateCamera = async (
    newCameras: MediaDeviceInfo[],
    cameraDevice: MediaDeviceInfo,
  ) => {
    setCameras(newCameras);
    setSelectedCamera(cameraDevice);
    setMediaDeviceSetting({
      microphoneDeviceId: selectedMicrophone?.deviceId,
      speakerDeviceId: selectedSpeaker?.deviceId,
      cameraDeviceId: cameraDevice.deviceId,
    });

    if (cameraPermissionDenied) return;

    try {
      setIsGettingStream(true);
      videoStreamTrack && videoStreamTrack.stop();
      const videoConstraints = getVideoConstraints(cameraDevice);
      const { videoTrack } = await getMediaStream(false, videoConstraints);

      if (localStream) {
        videoStreamTrack && localStream.removeTrack(videoStreamTrack);
        videoTrack && localStream.addTrack(videoTrack);
      } else {
        setLocalStream(getMediaStreamFromTracks(videoTrack, audioStreamTrack));
      }

      setCameraOn(true);
      setVideoStreamTrack(videoTrack);
      !cameraPermissionGranted && setCameraPermissionGranted(true);
      cameraPermissionDenied && setCameraPermissionDenied(false);
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setCamAndMicState({
          cameraOn: false,
          microphoneOn,
        });
        setCameraPermissionGranted(false);
        setCameraPermissionDenied(true);
        setCameraOn(false);
      } else {
        onError();
      }
    } finally {
      setIsGettingStream(false);
    }
  };

  const onToggleCamera = async () => {
    if (!initializedLocalStream || cameraPermissionDenied) return;

    setCamAndMicState({
      cameraOn: !cameraOn,
      microphoneOn,
    });

    if (cameraOn) {
      setCameraOn(false);
      if (videoStreamTrack) {
        videoStreamTrack.enabled = false;
      }
    } else {
      if (videoStreamTrack?.readyState === 'live') {
        setCameraOn(true);
        videoStreamTrack.enabled = true;
      } else {
        if (cameras.length) {
          const cameraDevice = cameras.find(
            device => device.deviceId === selectedCamera?.deviceId,
          )
            ? selectedCamera
            : cameras[0];
          handleUpdateCamera(cameras, cameraDevice);
        }
      }
    }
  };

  const onToggleMicrophone = async () => {
    if (!initializedLocalStream || microphonePermissionDenied) return;

    setCamAndMicState({
      cameraOn,
      microphoneOn: !microphoneOn,
    });

    if (microphoneOn) {
      setMicrophoneOn(false);
      if (audioStreamTrack) {
        audioStreamTrack.enabled = false;
      }
    } else {
      if (audioStreamTrack?.readyState === 'live') {
        setMicrophoneOn(true);
        audioStreamTrack.enabled = true;
      } else {
        if (microphones.length) {
          handleUpdateMicrophone(
            microphones,
            selectedMicrophone ? selectedMicrophone : microphones[0],
          );
        }
      }
    }
  };

  const onToggleHighFrameRate = () => {
    setAdvanceMediaSetting({
      highFrameRate: !highFrameRate,
      mirrorVideo,
    });
    setHighFrameRate(!highFrameRate);
  };

  const onToggleMirrorVideo = () => {
    setAdvanceMediaSetting({
      highFrameRate,
      mirrorVideo: !mirrorVideo,
    });
    setMirrorVideo(!mirrorVideo);
  };

  const onChangeCamera = async (deviceInfo: MediaDeviceInfo) => {
    if (cameraOn && deviceInfo === null) {
      setSelectedCamera(null);
      setCameraOn(false);
      return;
    }

    handleUpdateCamera(cameras, deviceInfo);
  };

  const onChangeMicrophone = async (deviceInfo: MediaDeviceInfo) => {
    if (microphoneOn && deviceInfo === null) {
      setSelectedMicrophone(null);
      setMicrophoneOn(false);
      return;
    }

    handleUpdateMicrophone(microphones, deviceInfo);
  };

  const onChangeSpeaker = (deviceInfo: MediaDeviceInfo) => {
    setSelectedSpeaker(deviceInfo);
    setMediaDeviceSetting({
      microphoneDeviceId: selectedMicrophone?.deviceId,
      speakerDeviceId: deviceInfo?.deviceId,
      cameraDeviceId: selectedCamera?.deviceId,
    });
  };

  const onError = () => {
    setLocalStream(null);
    setVideoStreamTrack(null);
    setAudioStreamTrack(null);
    setCameraOn(false);
    setMicrophoneOn(false);
  };

  const stopMediaStream = () => {
    setIsOnBackground(true);
    audioStreamTrack && audioStreamTrack.stop();
    videoStreamTrack && videoStreamTrack.stop();
    setAudioStreamTrack(null);
    setVideoStreamTrack(null);
    setLocalStream(null);
  };

  const startMediaStream = async () => {
    setIsOnBackground(false);
    if (!initializedLocalStream) {
      onPermission();
    } else {
      if (cameraPermissionDenied && microphonePermissionDenied) return;

      try {
        const audioConstraints = getAudioConstraints(selectedMicrophone);
        const videoConstraints = getVideoConstraints(selectedCamera);

        !cameraPermissionDenied && videoConstraints && setIsGettingStream(true);

        const { audioTrack, videoTrack } = await getMediaStream(
          !microphonePermissionDenied && audioConstraints,
          !cameraPermissionDenied && videoConstraints,
        );

        setLocalStream(getMediaStreamFromTracks(videoTrack, audioTrack));

        audioTrack && setAudioStreamTrack(audioTrack);
        videoTrack && setVideoStreamTrack(videoTrack);
      } catch {
        onError();
      } finally {
        setIsGettingStream(false);
      }
    }
  };

  return {
    initializedLocalStream,
    isOnBackground,
    isGettingStream,
    cameraPermissionGranted,
    microphonePermissionGranted,
    cameraPermissionDenied,
    microphonePermissionDenied,
    mirrorVideo,
    highFrameRate,
    cameraOn,
    microphoneOn,
    localStream,
    canvasStreamTrack,
    videoStreamTrack,
    audioStreamTrack,
    cameras,
    microphones,
    speakers,
    selectedCamera,
    selectedMicrophone,
    selectedSpeaker,
    onPermission,
    onToggleCamera,
    onToggleMicrophone,
    onToggleHighFrameRate,
    onToggleMirrorVideo,
    onChangeCamera,
    onChangeMicrophone,
    onChangeSpeaker,
    onError,
    stopMediaStream,
    startMediaStream,
  };
};
