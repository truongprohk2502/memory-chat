import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  title: string;
}

const SigningLayout = ({ children, title }: IProps) => {
  return (
    <div className="bg-signing bg-no-repeat bg-fixed bg-cover min-h-screen flex justify-center items-center py-20">
      <div className="rounded-md w-11/12 md:w-signing min-h-screen-3/4 px-28 py-20 bg-white flex flex-col justify-between">
        <div className="text-center text-4xl">{title}</div>
        {children}
      </div>
    </div>
  );
};

export default SigningLayout;
