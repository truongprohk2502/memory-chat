import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import { DIALOG_TIME } from 'constants/call';
import { CallStatus } from '..';

interface IProps {
  children: ReactNode;
  callStatus: CallStatus;
  hasDialogId: boolean;
  onEndedDialog: () => void;
}

const CallingProgressBar = ({
  children,
  callStatus,
  hasDialogId,
  onEndedDialog,
}: IProps) => {
  const [callPercentage, setCallPercentage] = useState<number>(0);

  const callIntervalRef = useRef<any>(null);

  useEffect(() => {
    if (callStatus === 'calling') {
      callIntervalRef.current = setInterval(() => {
        setCallPercentage(callPercentage => {
          if (callPercentage === 100) {
            onEndedDialog();
            clearInterval(callIntervalRef.current);
            return 0;
          }
          return callPercentage + 1;
        });
      }, DIALOG_TIME * 10);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callStatus]);

  useEffect(() => {
    if (!hasDialogId) {
      setCallPercentage(0);
      clearInterval(callIntervalRef.current);
    }
  }, [hasDialogId]);

  return (
    <CircularProgressbarWithChildren
      value={callPercentage}
      styles={buildStyles({
        strokeLinecap: 'butt',
        pathTransitionDuration: 0.5,
        pathColor: 'rgb(209 213 219)',
        backgroundColor: 'rgb(209 213 219)',
        trailColor: 'rgb(59, 130, 246)',
      })}
    >
      {children}
    </CircularProgressbarWithChildren>
  );
};

export default CallingProgressBar;
