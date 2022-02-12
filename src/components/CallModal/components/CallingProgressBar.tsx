import { DIALOG_TIME } from 'constants/call';
import { ReactNode, useEffect, useState } from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import { CallStatus } from '..';

interface IProps {
  children: ReactNode;
  callStatus: CallStatus;
  onEndedDialog: () => void;
}

let callInterval;

const CallingProgressBar = ({
  children,
  callStatus,
  onEndedDialog,
}: IProps) => {
  const [callPercentage, setCallPercentage] = useState<number>(0);

  useEffect(() => {
    if (callStatus === 'calling') {
      callInterval = setInterval(
        () =>
          setCallPercentage(callPercentage => {
            if (callPercentage === 100) {
              onEndedDialog();
              clearInterval(callInterval);
              return 0;
            }
            return callPercentage + 1;
          }),
        DIALOG_TIME * 10,
      );
    } else {
      setCallPercentage(0);
      if (callInterval) {
        clearInterval(callInterval);
        callInterval = null;
      }
    }
  }, [callStatus, onEndedDialog]);

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
