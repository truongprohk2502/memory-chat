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

type SubFrameContextType = {
  subFrame: ISubFrameType;
  setSubFrame: (subFrame: ISubFrameType) => void;
};

export const SubFrameContext = createContext<SubFrameContextType>(null);

const Homepage = () => {
  const [subFrame, setSubFrame] = useState<ISubFrameType>('dashboard');

  const {
    initializedToken,
    userInfo,
    pending: authPending,
  } = useSelector((state: RootState) => state.auth);
  const { pending: userPending } = useSelector(
    (state: RootState) => state.user,
  );

  const dispatch = useDispatch();
  const history = useHistory();

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
    <SubFrameContext.Provider value={{ subFrame, setSubFrame }}>
      <Header />
      <SubFrame />
      <MainFrame />
      {(authPending || userPending) && <FullSpinner />}
    </SubFrameContext.Provider>
  );
};

export default Homepage;
