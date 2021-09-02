import { ReactNode } from 'react';
import clsx from 'clsx';
import { Button } from 'components/Button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  title: string;
  hidden: boolean;
  children: ReactNode;
}

const SubFrameLayout = ({ title, hidden, children }: IProps) => {
  return (
    <div
      className={clsx(
        { 'transform -translate-x-full opacity-0': hidden },
        'w-full h-full flex flex-col p-8 bg-white transition duration-300 border-r border-gray-150 dark:border-gray-500 dark:bg-gray-900 dark:text-white',
      )}
    >
      <section className="w-full flex justify-between">
        <div className="flex-auto">
          <div className="font-extrabold text-3xl">{title}</div>
        </div>
        <Button size="sm" variant="circle" icon={faTimes} onClick={() => {}} />
      </section>
      <section className="flex-auto overflow-y-auto">{children}</section>
    </div>
  );
};

export default SubFrameLayout;
