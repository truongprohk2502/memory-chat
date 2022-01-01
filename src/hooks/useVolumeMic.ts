import { useEffect, useState } from 'react';

// @ts-ignore
window.AudioContext = window.AudioContext || window.webkitAudioContext;

const LOWEST_PERCENTAGE = 5;
const HIGHEST_PERCENTAGE = 24;
const REDUCE_PERCENTAGE = 4;
const STEP_PERCENTAGE = 5;

interface IPercentage {
  actual: number;
  virtual: number;
}

export const useVolumeMic = (audioTrack: MediaStreamTrack): number => {
  const [percentage, setPercentage] = useState<IPercentage>({
    actual: 0,
    virtual: 0,
  });

  useEffect(() => {
    if (audioTrack && AudioContext) {
      const audioContext = new AudioContext();
      const mediaStreamSource = audioContext.createMediaStreamSource(
        new MediaStream([audioTrack]),
      );
      const processor = audioContext.createScriptProcessor(2048, 1, 1);
      mediaStreamSource.connect(processor);
      processor.connect(audioContext.destination);
      processor.addEventListener('audioprocess', handleAverageVolume);

      return () => {
        mediaStreamSource.disconnect(processor);
        processor.disconnect(audioContext.destination);
        audioContext.close();
        processor.removeEventListener('audioprocess', handleAverageVolume);
      };
    }
  }, [audioTrack]);

  const handleAverageVolume = event => {
    const inputData = event.inputBuffer.getChannelData(0);
    const inputDataLength = inputData.length;
    let total = 0;
    for (let i = 0; i < inputDataLength; i++) {
      total += Math.pow(inputData[i], 2);
    }
    const rms = Math.sqrt(total / inputDataLength);
    const percentage = 100 * rms;
    setPercentage(prevPercentage => {
      const { actual: prevActualPercentage, virtual: prevVirtualPercentage } =
        prevPercentage;
      const actualRange = percentage - prevActualPercentage;
      if (
        Math.abs(actualRange) <= STEP_PERCENTAGE &&
        percentage >= LOWEST_PERCENTAGE
      ) {
        const virtualPercentage = prevVirtualPercentage + actualRange;
        return { actual: percentage, virtual: virtualPercentage };
      } else {
        const virtualPercentage =
          percentage < LOWEST_PERCENTAGE
            ? percentage
            : percentage < HIGHEST_PERCENTAGE
            ? percentage * (100 / HIGHEST_PERCENTAGE)
            : 100;
        return {
          actual: percentage,
          virtual:
            virtualPercentage >= prevVirtualPercentage - REDUCE_PERCENTAGE
              ? virtualPercentage
              : prevVirtualPercentage - REDUCE_PERCENTAGE,
        };
      }
    });
  };

  return percentage.virtual < 100 ? percentage.virtual : 100;
};
