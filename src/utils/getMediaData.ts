import { Dispatch, SetStateAction } from 'react';
import { PageType } from 'hooks/useLocalMedia';
import { getMediaDeviceSetting } from './storage';
import { INITIAL_CAMERA_CONSTRAINTS } from 'constants/webrtc';

interface IProps {
  attemptMicrophonePermission?: boolean;
  attemptCameraPermission?: boolean;
  pageType: PageType;
  requireCamera: boolean;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}

interface IReturnProps {
  cameras: MediaDeviceInfo[];
  microphones: MediaDeviceInfo[];
  speakers: MediaDeviceInfo[];
  selectedCamera: MediaDeviceInfo;
  selectedMicrophone: MediaDeviceInfo;
  selectedSpeaker: MediaDeviceInfo;
  cameraPermissionDenied: boolean;
  microphonePermissionDenied: boolean;
  localStream: MediaStream;
  audioTrack: MediaStreamTrack;
  videoTrack: MediaStreamTrack;
}

export const getMediaData = async ({
  attemptMicrophonePermission,
  attemptCameraPermission,
  requireCamera,
  setIsLoading,
}: IProps): Promise<IReturnProps> => {
  let cameras: MediaDeviceInfo[] = [];
  let microphones: MediaDeviceInfo[] = [];
  let speakers: MediaDeviceInfo[] = [];
  let selectedCamera: MediaDeviceInfo = null;
  let selectedMicrophone: MediaDeviceInfo = null;
  let selectedSpeaker: MediaDeviceInfo = null;
  let microphonePermissionDenied: boolean = false;
  let cameraPermissionDenied: boolean = false;
  let localStream: MediaStream = null;
  let audioTrack: MediaStreamTrack;
  let videoTrack: MediaStreamTrack;

  if (attemptMicrophonePermission && attemptCameraPermission) {
    try {
      const initStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      initStream.getTracks().forEach(track => track.stop());
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        microphonePermissionDenied = true;
        cameraPermissionDenied = true;
      }
    }
  } else if (attemptMicrophonePermission) {
    try {
      const initStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      initStream.getTracks().forEach(track => track.stop());
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        microphonePermissionDenied = true;
      }
    }
  } else if (attemptCameraPermission) {
    try {
      const initStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      initStream.getTracks().forEach(track => track.stop());
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        cameraPermissionDenied = true;
      }
    }
  }

  if (!microphonePermissionDenied && !cameraPermissionDenied) {
    requireCamera && setIsLoading && setIsLoading(true);

    const device = await getDevices();

    cameras = device.cameras;
    microphones = device.microphones;
    speakers = device.speakers;

    const { cameraDeviceId, microphoneDeviceId, speakerDeviceId } =
      getMediaDeviceSetting() || {};

    if (microphones.length) {
      const storageMicrophone = microphones.find(
        device => device.deviceId === microphoneDeviceId,
      );

      selectedMicrophone = storageMicrophone
        ? storageMicrophone
        : getMostPriorityDevice(microphones);
    }

    if (speakers.length) {
      const storageSpeaker = speakers.find(
        device => device.deviceId === speakerDeviceId,
      );

      selectedSpeaker = storageSpeaker
        ? storageSpeaker
        : getMostPriorityDevice(speakers);
    }

    if (cameras.length) {
      const storageCamera = cameras.find(
        device => device.deviceId === cameraDeviceId,
      );

      selectedCamera = storageCamera ? storageCamera : cameras[0];
    }

    const audioConstraints = getAudioConstraints(selectedMicrophone);
    const videoConstraints = getVideoConstraints(selectedCamera);

    if (audioConstraints) {
      try {
        const trackData = await getMediaStream(audioConstraints, false);
        audioTrack = trackData.audioTrack;
      } catch (err) {
        console.error(err);
      }
    }

    if (videoConstraints) {
      try {
        const trackData = await getMediaStream(false, videoConstraints);
        videoTrack = trackData.videoTrack;
      } catch (err) {
        console.error(err);
      }
    }

    localStream = getMediaStreamFromTracks(videoTrack, audioTrack);
  }

  return {
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
  };
};

export const getMostPriorityDevice = (
  devices: MediaDeviceInfo[],
): MediaDeviceInfo => {
  const communicationDevice = devices.find(
    device => device.deviceId === 'communications',
  );
  const defaultDevice = devices.find(device => device.deviceId === 'default');

  if (communicationDevice) {
    return communicationDevice;
  } else if (defaultDevice) {
    return defaultDevice;
  } else {
    return devices?.[0];
  }
};

interface IDevices {
  cameras: MediaDeviceInfo[];
  microphones: MediaDeviceInfo[];
  speakers: MediaDeviceInfo[];
}

export const getDevices = async (): Promise<IDevices> => {
  const devices = await navigator.mediaDevices.enumerateDevices();

  const cameras: MediaDeviceInfo[] = devices.filter(
    device => device.kind === 'videoinput',
  );
  const microphones: MediaDeviceInfo[] = devices.filter(
    device => device.kind === 'audioinput',
  );
  const speakers: MediaDeviceInfo[] = devices.filter(
    device => device.kind === 'audiooutput',
  );

  return { microphones, cameras, speakers };
};

export const getAudioConstraints = (
  microphoneDevice: MediaDeviceInfo,
): MediaTrackConstraints | boolean =>
  microphoneDevice?.deviceId
    ? microphoneDevice.deviceId === 'default'
      ? true
      : {
          deviceId: {
            exact: microphoneDevice.deviceId,
          },
        }
    : false;

export const getVideoConstraints = (
  cameraDevice: MediaDeviceInfo,
): MediaTrackConstraints | boolean =>
  cameraDevice?.deviceId
    ? {
        ...INITIAL_CAMERA_CONSTRAINTS,
        deviceId: { exact: cameraDevice.deviceId },
      }
    : false;

export const getMediaStream = async (
  audioConstraints: MediaTrackConstraints | boolean,
  videoConstraints: MediaTrackConstraints | boolean,
): Promise<{ audioTrack: MediaStreamTrack; videoTrack: MediaStreamTrack }> => {
  let audioStreamTrack: MediaStreamTrack;
  let videoStreamTrack: MediaStreamTrack;

  if (audioConstraints) {
    try {
      audioStreamTrack = (
        await navigator.mediaDevices.getUserMedia({
          audio: audioConstraints,
        })
      ).getAudioTracks()[0];
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        throw new DOMException('NOT_ALLOWED_MICROPHONE', 'NotAllowedError');
      } else {
        throw err;
      }
    }
  }

  if (videoConstraints) {
    try {
      videoStreamTrack = (
        await navigator.mediaDevices.getUserMedia({
          video: videoConstraints,
        })
      ).getVideoTracks()[0];
    } catch (err) {
      audioStreamTrack && audioStreamTrack.stop();
      if (err.name === 'NotAllowedError') {
        throw new DOMException('NOT_ALLOWED_CAMERA', 'NotAllowedError');
      } else {
        throw err;
      }
    }
  }

  return { audioTrack: audioStreamTrack, videoTrack: videoStreamTrack };
};

export const getMediaStreamFromTracks = (
  videoTrack: MediaStreamTrack,
  audioTrack: MediaStreamTrack,
): MediaStream =>
  videoTrack || audioTrack
    ? new MediaStream(
        videoTrack && audioTrack
          ? [videoTrack, audioTrack]
          : videoTrack
          ? [videoTrack]
          : [audioTrack],
      )
    : null;
