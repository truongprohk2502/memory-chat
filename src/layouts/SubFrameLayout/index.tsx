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
    <div className="fixed inset-y-0 left-28 w-96">
      <div
        className={clsx(
          {
            'transform -translate-x-full opacity-0': subFrame !== subFrameType,
          },
          'w-full h-full flex flex-col px-10 py-8 bg-white transition duration-300 border-r border-gray-150 dark:border-gray-500 dark:bg-gray-900 dark:text-white',
        )}
      >
        <section className="w-full flex justify-between">
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
