import { useCallback, useState } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/Button';
import { SettingLabelType } from 'interfaces/stringLiterals';
import SubFrameLayout from 'layouts/SubFrameLayout';
import { useTranslation } from 'react-i18next';
import PersonalSetting from './PersonalSetting';
import SystemSetting from './SystemSetting';
import { UploadAvatarModal } from 'components/UploadAvatarModal';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { getFullname } from 'utils/getFullname';

const Setting = () => {
  const [openAvatarModal, setOpenAvatarModal] = useState<boolean>(false);
  const [expandingSettingType, setExpandingSettingType] =
    useState<SettingLabelType>(null);

  const { t } = useTranslation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleCloseSettingAvatarModal = useCallback(() => {
    setOpenAvatarModal(false);
  }, []);

  return (
    <SubFrameLayout title={t('header.settings')} subFrameType="setting">
      <div className="relative w-fit mx-auto">
        <img
          src={userInfo?.avatar}
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
      <div className="font-bold my-6 text-center">
        {userInfo &&
          getFullname(
            userInfo.firstName,
            userInfo.middleName,
            userInfo.lastName,
          )}
      </div>
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
        onClose={handleCloseSettingAvatarModal}
      />
    </SubFrameLayout>
  );
};

export default Setting;
