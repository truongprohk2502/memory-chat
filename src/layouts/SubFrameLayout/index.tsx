import { ReactNode, useContext } from 'react';
import clsx from 'clsx';
import { Button } from 'components/Button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SubFrameContext } from 'pages/Homepage';
import { ISubFrameType } from 'interfaces/stringLiterals';

interface IProps {
  title: string;
  subFrameType: ISubFrameType;
  children: ReactNode;
}

const SubFrameLayout = ({ title, subFrameType, children }: IProps) => {
  const { subFrame, setSubFrame } = useContext(SubFrameContext);

  return (
    <div
      className={clsx(
        { 'transform -translate-x-96 opacity-0': subFrame !== subFrameType },
        'fixed inset-y-0 left-28 w-96 opacity-100 transition duration-300',
      )}
    >
      <div className="w-full h-full flex flex-col px-10 py-8 bg-white dark:bg-gray-900 dark:text-white">
        <section className="w-full flex justify-between mb-4">
          <div className="flex-auto">
            <div className="font-extrabold text-3xl">{title}</div>
          </div>
          <Button
            size="sm"
            variant="circle"
            icon={faTimes}
            onClick={() => setSubFrame('dashboard')}
          />
        </section>
        <section className="flex-auto overflow-y-auto">{children}</section>
      </div>
    </div>
  );
};

export default SubFrameLayout;
