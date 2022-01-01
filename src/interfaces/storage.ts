export interface INotificationSetting {
  desktopNotification: boolean;
  soundNotification: boolean;
}

export interface IMediaDeviceSetting {
  cameraDeviceId: string;
  microphoneDeviceId: string;
  speakerDeviceId: string;
}

export interface IAdvanceMediaSetting {
  mirrorVideo: boolean;
  highFrameRate: boolean;
}

export interface ICamAndMicState {
  cameraOn: boolean;
  microphoneOn: boolean;
}
