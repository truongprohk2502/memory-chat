import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Router from 'routes';
import { getLanguage } from 'utils/storage';

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lng = getLanguage();
    lng && i18n.changeLanguage(lng);
  }, [i18n]);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white">
      <Router />
    </div>
  );
};

export default App;
