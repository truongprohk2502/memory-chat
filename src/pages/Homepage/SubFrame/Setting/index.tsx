import { useState } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/Button';
import { SettingLabelType } from 'interfaces/stringLiterals';
import SubFrameLayout from 'layouts/SubFrameLayout';
import { useTranslation } from 'react-i18next';
import PersonalSetting from './PersonalSetting';
import SystemSetting from './SystemSetting';
import { UploadAvatarModal } from 'components/UploadAvatarModal';

const Setting = () => {
  const [openAvatarModal, setOpenAvatarModal] = useState<boolean>(false);
  const [expandingSettingType, setExpandingSettingType] =
    useState<SettingLabelType>(null);

  const { t } = useTranslation();

  return (
    <SubFrameLayout title={t('header.settings')} subFrameType="setting">
      <div className="relative w-fit mx-auto">
        <img
          src="https://chitchat-react.vercel.app/assets/images/contact/2.jpg"
          alt="logo"
          className="w-24 h-24 object-cover mx-auto rounded-full mt-4 cursor-pointer"
        />
        <Button
          variant="circle"
          size="sm"
          icon={faPen}
          onClick={() => setOpenAvatarModal(true)}
          buttonClassName="absolute bottom-0 right-0"
        />
      </div>
      <div className="font-bold my-6 text-center">Nguyen Dinh Truong</div>
      <PersonalSetting
        expandingSettingType={expandingSettingType}
        setExpandingSettingType={(value: SettingLabelType) =>
          setExpandingSettingType(value)
        }
      />
      <SystemSetting
        expandingSettingType={expandingSettingType}
        setExpandingSettingType={(value: SettingLabelType) =>
          setExpandingSettingType(value)
        }
      />
      <UploadAvatarModal
        isOpen={openAvatarModal}
        onClose={() => setOpenAvatarModal(false)}
      />
    </SubFrameLayout>
  );
};

export default Setting;
