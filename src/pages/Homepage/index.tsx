import { createContext, useState } from 'react';
import { ISubFrameType } from 'interfaces/stringLiterals';
import Header from './Header';
import SubFrame from './SubFrame';
import MainFrame from './MainFrame';

type SubFrameContextType = {
  subFrame: ISubFrameType;
  setSubFrame: (subFrame: ISubFrameType) => void;
};

export const SubFrameContext = createContext<SubFrameContextType>(null);

const Homepage = () => {
  const [subFrame, setSubFrame] = useState<ISubFrameType>('dashboard');

  return (
    <SubFrameContext.Provider value={{ subFrame, setSubFrame }}>
      asd
      <Header />
      <SubFrame />
      <MainFrame />
    </SubFrameContext.Provider>
  );
};

export default Homepage;
