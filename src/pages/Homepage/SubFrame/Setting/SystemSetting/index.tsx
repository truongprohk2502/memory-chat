import { useEffect, useState } from 'react';
import { Accordion } from 'components/Accordion';
import { Select } from 'components/Select';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_NOTIFICATION_SETTING,
  LANGUAGES,
} from 'constants/system';
import { LanguageType } from 'interfaces/system';
import { useTranslation } from 'react-i18next';
import {
  getLanguage,
  getNotificationSetting,
  setLanguage as setStorageLanguage,
} from 'utils/storage';
import { Toggle } from 'components/Toggle';
import { SettingLabelType } from 'interfaces/stringLiterals';

interface IProps {
  expandingSettingType: SettingLabelType;
  setExpandingSettingType: (value: SettingLabelType) => void;
}

const SystemSetting = ({
  expandingSettingType,
  setExpandingSettingType,
}: IProps) => {
  const [expanding, setExpanding] = useState<boolean>(false);
  const [language, setLanguage] = useState<LanguageType>(DEFAULT_LANGUAGE);
  const [checkedSoundNotification, setCheckedSoundNotification] =
    useState<boolean>(DEFAULT_NOTIFICATION_SETTING.soundNotification);
  const [checkedDesktopNotification, setCheckedDesktopNotification] =
    useState<boolean>(DEFAULT_NOTIFICATION_SETTING.desktopNotification);
  const [supportNotification, setSupportNotification] =
    useState<boolean>(false);
  const [deniedNotification, setDeniedNotification] = useState<boolean>(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (expandingSettingType !== 'system') {
      setExpanding(false);
    }
  }, [expandingSettingType]);

  useEffect(() => {
    const requestDesktopNotification = () => {
      if ('Notification' in window) {
        setSupportNotification(true);
        if (Notification.permission === 'default') {
          Notification.requestPermission().then(permission => {
            if (permission === 'denied') {
              setCheckedDesktopNotification(false);
              setDeniedNotification(true);
            }
          });
        } else if (Notification.permission === 'denied') {
          setCheckedDesktopNotification(false);
          setDeniedNotification(true);
        }
      }
    };

    const storageLanguage = getLanguage();
    if (storageLanguage) {
      setLanguage(storageLanguage);
    }

    const notificationSetting = getNotificationSetting();
    if (notificationSetting) {
      const { soundNotification, desktopNotification } = notificationSetting;
      setCheckedSoundNotification(soundNotification);
      setCheckedDesktopNotification(desktopNotification);
      desktopNotification && requestDesktopNotification();
    } else {
      DEFAULT_NOTIFICATION_SETTING.desktopNotification &&
        requestDesktopNotification();
    }
  }, []);

  const handleChangeLanguage = (lng: LanguageType) => {
    if (lng) {
      setLanguage(lng);
      setStorageLanguage(lng);
      i18n.changeLanguage(lng);
    }
  };

  const handleToggleExpand = () => {
    if (!expanding) {
      setExpandingSettingType('system');
    }
    setExpanding(!expanding);
  };

  return (
    <Accordion
      title={t('setting.system.title')}
      expanding={expanding}
      onToggleExpand={handleToggleExpand}
    >
      <div className="flex justify-between items-center h-10 py-2">
        <div className="font-semibold text-sm">
          {t('setting.system.options.language.title')}
        </div>
        <Select
          value={language}
          options={LANGUAGES}
          onChange={handleChangeLanguage}
        />
      </div>
      <div className="flex justify-between items-center h-10 py-2">
        <div className="font-semibold text-sm">
          {t('setting.system.options.sound_notification')}
        </div>
        <Toggle
          checked={checkedSoundNotification}
          onChange={() =>
            setCheckedSoundNotification(!checkedSoundNotification)
          }
        />
      </div>
      <div className="flex justify-between items-center h-10 py-2">
        <div className="font-semibold text-sm">
          {t('setting.system.options.desktop_notification.title')}
        </div>
        <Toggle
          checked={checkedDesktopNotification}
          disabled={!supportNotification || deniedNotification}
          tooltip={
            !supportNotification
              ? t(
                  'setting.system.options.desktop_notification.errors.unsupport',
                )
              : deniedNotification &&
                t('setting.system.options.desktop_notification.errors.denied')
          }
          onChange={() =>
            setCheckedDesktopNotification(!checkedDesktopNotification)
          }
        />
      </div>
    </Accordion>
  );
};

export default SystemSetting;
