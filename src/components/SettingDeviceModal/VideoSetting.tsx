import clsx from 'clsx';

interface IProps {
  isSelected: boolean;
}

export const VideoSetting = ({ isSelected }: IProps) => {
  return <div className={clsx({ hidden: !isSelected })}>Video setting</div>;
};
