import { useState } from 'react';
import { ISubFrameType } from 'interfaces/stringLiterals';
import Header from 'pages/Homepage/Header';
import SubFrame from 'pages/Homepage/SubFrame';

export type ReadingTypes = 'some' | 'variants' | 'of' | 'strings';

const Homepage = () => {
  const [subFrame, setSubFrame] = useState<ISubFrameType>('dashboard');

  return (
    <>
      <Header
        subFrame={subFrame}
        setSubFrame={(subFrame: ISubFrameType) => setSubFrame(subFrame)}
      />
      <SubFrame subFrame={subFrame} />
    </>
  );
};

export default Homepage;
