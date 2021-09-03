import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/Button';
import SubFrameLayout from 'layouts/SubFrameLayout';
import { useTranslation } from 'react-i18next';
import PersonalSetting from './PersonalSetting';
import SystemSetting from './SystemSetting';

const Setting = () => {
  const { t } = useTranslation();

  return (
    <SubFrameLayout title={t('setting.title')} subFrameType="setting">
      <div className="relative w-fit mx-auto">
        <img
          src="https://chitchat-react.vercel.app/assets/images/contact/2.jpg"
          alt="logo"
          className="w-24 h-24 object-cover mx-auto rounded-full mt-8 cursor-pointer"
        />
        <Button
          variant="circle"
          size="sm"
          icon={faPen}
          onClick={() => {}}
          buttonClassName="absolute bottom-0 right-0"
        />
      </div>
      <div className="font-bold my-6 text-center">Nguyen Dinh Truong</div>
      <PersonalSetting />
      <SystemSetting />
    </SubFrameLayout>
  );
};

export default Setting;
