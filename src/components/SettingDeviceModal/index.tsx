import { Modal } from 'components/Modal';
import { SettingDevice } from './SettingDevice';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingDeviceModal = ({ isOpen, onClose }: IProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title="Setting devices"
      hideFooter
      className="select-none"
    >
      <SettingDevice />
    </Modal>
  );
};
