import { useEffect, useState } from 'react';
import { Accordion } from 'components/Accordion';
import { Select } from 'components/Select';
import { LANGUAGES } from 'constants/system';
import { LanguageType } from 'interfaces/system';
import { useTranslation } from 'react-i18next';
import { getLanguage, setLanguage as setStorageLanguage } from 'utils/storage';

const SystemSetting = () => {
  const [language, setLanguage] = useState<LanguageType>('en');

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storageLanguage = getLanguage();
    if (storageLanguage) {
      setLanguage(storageLanguage);
    }
  }, []);

  const handleChangeLanguage = (lng: LanguageType) => {
    if (lng) {
      setLanguage(lng);
      setStorageLanguage(lng);
      i18n.changeLanguage(lng);
    }
  };

  return (
    <Accordion title={t('setting.options.system.title')}>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm">
          {t('setting.options.system.options.language.title')}
        </div>
        <Select
          value={language}
          options={LANGUAGES}
          onChange={handleChangeLanguage}
        />
      </div>
    </Accordion>
  );
};

export default SystemSetting;
