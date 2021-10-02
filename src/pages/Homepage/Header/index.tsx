import { useEffect, useState, useContext } from 'react';
import {
  faBell,
  faCog,
  faFileAlt,
  faMoon,
  faPowerOff,
  faSun,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import logo from 'assets/images/logo.png';
import { Button } from 'components/Button';
import { useTranslation } from 'react-i18next';
import { getDarkMode, setDarkMode as setStorageDarkMode } from 'utils/storage';
import { SubFrameContext } from '..';

const Header = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const { t } = useTranslation();
  const { subFrame, setSubFrame } = useContext(SubFrameContext);

  useEffect(() => {
    const darkMode = getDarkMode();
    if (darkMode) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const handleChangeThemeMode = () => {
    darkMode
      ? document.documentElement.classList.remove('dark')
      : document.documentElement.classList.add('dark');
    setDarkMode(!darkMode);
    setStorageDarkMode(!darkMode);
  };

  return (
    <section className="fixed z-20 left-0 inset-y-0 w-28 px-5 py-10 flex flex-col justify-between border-r border-gray-150 bg-white dark:bg-gray-900 dark:border-gray-500">
      <div className="w-full flex flex-col items-center">
        <img src={logo} alt="logo" className="w-12 h-12" />
        <img
          src="https://chitchat-react.vercel.app/assets/images/contact/2.jpg"
          alt="logo"
          className="w-12 h-12 object-cover rounded-full border-4 border-blue-500 mt-16 cursor-pointer"
          onClick={() => setSubFrame('dashboard')}
        />
        <Button
          containerClassName="mt-8"
          variant="circle"
          icon={faUser}
          hasOnlyButton={false}
          hasTooltip
          tooltipName={t('header.friends')}
          tooltipPlacement="right"
          onClick={() => setSubFrame('friend')}
          isActive={subFrame === 'friend'}
        />
        <Button
          containerClassName="mt-8"
          variant="circle"
          icon={faUsers}
          hasOnlyButton={false}
          hasTooltip
          tooltipName={t('header.groups')}
          tooltipPlacement="right"
          onClick={() => setSubFrame('group')}
          isActive={subFrame === 'group'}
        />
        <Button
          containerClassName="mt-8"
          variant="circle"
          icon={faFileAlt}
          hasOnlyButton={false}
          hasTooltip
          tooltipName={t('header.documents')}
          tooltipPlacement="right"
          onClick={() => setSubFrame('document')}
          isActive={subFrame === 'document'}
        />
        <Button
          containerClassName="mt-8"
          variant="circle"
          icon={faBell}
          hasOnlyButton={false}
          hasPingBadge
          hasTooltip
          tooltipName={t('header.notifications')}
          tooltipPlacement="right"
          onClick={() => setSubFrame('notification')}
          isActive={subFrame === 'notification'}
        />
        <Button
          containerClassName="mt-8"
          variant="circle"
          icon={faCog}
          hasOnlyButton={false}
          hasTooltip
          tooltipName={t('header.settings')}
          tooltipPlacement="right"
          onClick={() => setSubFrame('setting')}
          isActive={subFrame === 'setting'}
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <Button
          containerClassName="mt-8"
          variant="circle"
          icon={darkMode ? faSun : faMoon}
          hasOnlyButton={false}
          hasTooltip
          tooltipName={
            darkMode ? t('header.light_mode') : t('header.dark_mode')
          }
          tooltipPlacement="right"
          onClick={handleChangeThemeMode}
        />
        <Button
          containerClassName="mt-8"
          variant="circle"
          icon={faPowerOff}
          hasOnlyButton={false}
          hasTooltip
          tooltipName={t('header.sign_out')}
          tooltipPlacement="right"
          onClick={() => {}}
        />
      </div>
    </section>
  );
};

export default Header;
