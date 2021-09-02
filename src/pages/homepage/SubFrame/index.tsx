import { ISubFrameType } from 'interfaces/stringLiterals';
import Setting from 'pages/Homepage/SubFrame/Setting';

interface IProps {
  subFrame: ISubFrameType;
}

const SubFrame = ({ subFrame }: IProps) => {
  return (
    <div className="fixed inset-y-0 left-28 w-96">
      <Setting hidden={subFrame !== 'setting'} />
    </div>
  );
};

export default SubFrame;
