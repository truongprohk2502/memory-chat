import { useRef, useLayoutEffect, HTMLAttributes } from 'react';
import { useVolumeMic } from 'hooks/useVolumeMic';
import clsx from 'clsx';

export interface IProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  audioTrack: MediaStreamTrack;
  disabled?: boolean;
}

export const MicrophoneProgressBar = ({
  className = '',
  audioTrack,
  disabled = false,
}: IProps) => {
  const volumeBarRef = useRef<HTMLDivElement>(null!);
  const percentage = useVolumeMic(audioTrack);

  useLayoutEffect(() => {
    if (volumeBarRef) {
      volumeBarRef.current.style.width = `${disabled ? 0 : percentage}%`;
      volumeBarRef.current.style.backgroundColor = '#00FF00';
    }
  }, [disabled, percentage]);

  return (
    <div
      className={clsx('bg-gray-400 rounded-md', { '!bg-gray-200': disabled })}
    >
      <div className={`rounded-md h-1 ${className}`} ref={volumeBarRef} />
    </div>
  );
};
