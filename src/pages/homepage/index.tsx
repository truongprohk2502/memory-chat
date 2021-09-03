import { createContext, useState } from 'react';
import { ISubFrameType } from 'interfaces/stringLiterals';
import Header from 'pages/Homepage/Header';
import SubFrame from 'pages/Homepage/SubFrame';

type SubFrameContextType = {
  subFrame: ISubFrameType;
  setSubFrame: (subFrame: ISubFrameType) => void;
};

export const SubFrameContext = createContext<SubFrameContextType>(null);

const Homepage = () => {
  const [subFrame, setSubFrame] = useState<ISubFrameType>('dashboard');

  return (
    <SubFrameContext.Provider value={{ subFrame, setSubFrame }}>
      <Header />
      <SubFrame />
    </SubFrameContext.Provider>
  );
};

export default Homepage;
