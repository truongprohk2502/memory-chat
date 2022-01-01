import { createContext, useEffect, useState } from 'react';
import { ISubFrameType } from 'interfaces/stringLiterals';
import Header from './Header';
import SubFrame from './SubFrame';
import MainFrame from './MainFrame';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from 'utils/storage';
import { getUserInfoRequest } from 'reducers/auth';
import { RootState } from 'reducers';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { FullSpinner } from 'components/FullSpinner';
import Pusher, { Channel } from 'pusher-js';
import { io } from 'socket.io-client';
import { SettingDeviceModal } from 'components/SettingDeviceModal';

type SubFrameContextType = {
  subFrame: ISubFrameType;
  setSubFrame: (subFrame: ISubFrameType) => void;
  isOpenSettingDeviceModal: boolean;
  setIsOpenSettingDeviceModal: (isOpen: boolean) => void;
};

export const SubFrameContext = createContext<SubFrameContextType>(null);
export const PusherContext = createContext<Channel>(null);

const Homepage = () => {
  const [isOpenSettingDeviceModal, setIsOpenSettingDeviceModal] =
    useState<boolean>(false);
  const [subFrame, setSubFrame] = useState<ISubFrameType>('dashboard');
  const [channel, setChannel] = useState<Channel>(null);

  const {
    initializedToken,
    userInfo,
    pending: authPending,
  } = useSelector((state: RootState) => state.auth);
  const { pending: userPending } = useSelector(
    (state: RootState) => state.user,
  );
  const { pending: contactPending } = useSelector(
    (state: RootState) => state.contact,
  );
  const { pendingGetInitMessages: messagePending } = useSelector(
    (state: RootState) => state.message,
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userInfo) {
      const socket = io(`${process.env.REACT_APP_API_ENDPOINT}/events`, {
        query: {
          userId: userInfo.id,
        },
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
        cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      });
      const channelName = `channel_${userInfo.id}`;
      const channel = pusher.subscribe(channelName);
      setChannel(channel);

      return () => {
        pusher.unsubscribe(channelName);
        pusher.disconnect();
      };
    }
  }, [userInfo]);

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(getUserInfoRequest());
    }
  }, [dispatch]);

  useEffect(() => {
    initializedToken && !userInfo && history.replace(ROUTES.LOGIN);
  }, [initializedToken, userInfo, history]);

  return (
    <PusherContext.Provider value={channel}>
      <SubFrameContext.Provider
        value={{
          subFrame,
          setSubFrame,
          isOpenSettingDeviceModal,
          setIsOpenSettingDeviceModal,
        }}
      >
        <Header />
        <SubFrame />
        <MainFrame />
        <SettingDeviceModal
          isOpen={isOpenSettingDeviceModal}
          onClose={() => setIsOpenSettingDeviceModal(false)}
        />
        {(authPending || userPending || contactPending || messagePending) && (
          <FullSpinner />
        )}
      </SubFrameContext.Provider>
    </PusherContext.Provider>
  );
};

export default Homepage;
