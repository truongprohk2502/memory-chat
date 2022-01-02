import { useEffect, useState } from 'react';
import { LOW_FRAME_RATE, LOW_RESOLUTION } from 'constants/webrtc';

const videoCanvas = document.createElement('canvas');
videoCanvas.width = LOW_RESOLUTION.WIDTH;
videoCanvas.height = LOW_RESOLUTION.HEIGHT;

const emptyCanvas = document.createElement('canvas');
emptyCanvas.getContext('2d').fillStyle = 'black';
emptyCanvas.getContext('2d').fillRect(0, 0, 4, 3);

export const useCanvasStream = (
  videoTrack: MediaStreamTrack,
): MediaStreamTrack => {
  const [video, setVideo] = useState<HTMLVideoElement>(null);
  const [canvasStreamTrack, setCanvasStreamTrack] =
    useState<MediaStreamTrack>(null);
  const [videoStreamType, setVideoStreamType] = useState<
    'video-frame' | 'empty-frame'
  >(null);

  useEffect(() => {
    const video = document.createElement('video');
    let drawVideoInterval;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.onplay = () => {
      drawVideoInterval = setInterval(() => {
        if (
          !video.paused &&
          !video.ended &&
          video.videoWidth &&
          video.videoHeight
        ) {
          const { videoWidth, videoHeight } = video;
          const { width: canvasWidth, height: canvasHeight } = videoCanvas;
          const maxChangeRatio = Math.max(
            canvasWidth / videoWidth,
            canvasHeight / videoHeight,
          );
          const cw = videoWidth * maxChangeRatio;
          const ch = videoHeight * maxChangeRatio;
          const cx = (canvasWidth - cw) / 2;
          const cy = (canvasHeight - ch) / 2;
          videoCanvas
            .getContext('2d')
            .drawImage(video, 0, 0, videoWidth, videoHeight, cx, cy, cw, ch);
        }
      }, 1000 / LOW_FRAME_RATE);
    };
    setVideo(video);

    return () => {
      drawVideoInterval && clearInterval(drawVideoInterval);
      video.remove();
    };
  }, []);

  useEffect(() => {
    if (video && videoTrack) {
      video.srcObject = new MediaStream([videoTrack]);

      const isPlaying =
        video.currentTime > 0 &&
        !video.paused &&
        !video.ended &&
        video.readyState > video.HAVE_CURRENT_DATA;
      !isPlaying && video.play();

      return () => {
        video.srcObject = null;
      };
    }
  }, [videoTrack, video]);

  useEffect(() => {
    if (!videoStreamType) {
      let newCanvasStream: MediaStream;

      if (videoTrack) {
        setVideoStreamType('video-frame');
        newCanvasStream = videoCanvas.captureStream();
      } else {
        setVideoStreamType('empty-frame');
        newCanvasStream = emptyCanvas.captureStream(5);
      }

      setCanvasStreamTrack(newCanvasStream.getVideoTracks()[0]);
    }
  }, [videoTrack, videoStreamType]);

  useEffect(() => {
    if (canvasStreamTrack && videoStreamType === 'empty-frame' && videoTrack) {
      setVideoStreamType('video-frame');
      const newCanvasStream = videoCanvas.captureStream();
      canvasStreamTrack.stop();
      setCanvasStreamTrack(newCanvasStream.getVideoTracks()[0]);
    }
  }, [canvasStreamTrack, videoTrack, videoStreamType]);

  return canvasStreamTrack;
};
