import { useState } from 'react';
import { ISubFrameType } from 'interfaces/stringLiterals';
import Header from './header';

export type ReadingTypes = 'some' | 'variants' | 'of' | 'strings';

const Homepage = () => {
  const [subFrame, setSubFrame] = useState<ISubFrameType>('dashboard');

  return (
    <div className="flex">
      <Header
        subFrame={subFrame}
        setSubFrame={(subFrame: ISubFrameType) => setSubFrame(subFrame)}
      />
    </div>
  );
};

export default Homepage;
