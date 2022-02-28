import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { increaseCallTime } from 'reducers/message';

const Timer = () => {
  const timerIntervalRef = useRef<any>(null);

  const dispatch = useDispatch();

  const { isTalkingCall, isAnsweringCall } = useSelector(
    (state: RootState) => state.contact,
  );
  const { callTime } = useSelector((state: RootState) => state.message);

  useEffect(() => {
    if (isTalkingCall || isAnsweringCall) {
      timerIntervalRef.current = setInterval(() => {
        dispatch(increaseCallTime());
      }, 1000);
    } else {
      clearTimeout(timerIntervalRef.current);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTalkingCall, isAnsweringCall, dispatch]);

  const getTimeCounter = (time: number) => {
    const timeString = time.toString();
    return timeString.length < 2 ? `0${timeString}` : timeString;
  };

  return (
    <span>
      {getTimeCounter(Math.floor(callTime / 3600))}:
      {getTimeCounter(Math.floor(callTime / 60))}:
      {getTimeCounter(callTime % 60)}
    </span>
  );
};

export default Timer;
