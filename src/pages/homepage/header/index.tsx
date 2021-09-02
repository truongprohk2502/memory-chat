import { useEffect, useState } from 'react';
import {
  faBell,
  faCog,
  faFileAlt,
  faMoon,
  faPowerOff,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import logo from 'assets/images/logo.png';
import { Button } from 'components/Button';
import { useTranslation } from 'react-i18next';
import { getThemeSetting, setThemeSetting } from 'utils/storage';
import { ISubFrameType } from 'interfaces/stringLiterals';

interface IProps {
  subFrame: ISubFrameType;
  setSubFrame: (subFrame: ISubFrameType) => void;
}

const Header = ({ subFrame, setSubFrame }: IProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const { t } = useTranslation();

  useEffect(() => {
    const themeSetting = getThemeSetting();
    if (themeSetting?.darkMode) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const handleChangeThemeMode = () => {
    darkMode
      ? document.documentElement.classList.remove('dark')
      : document.documentElement.classList.add('dark');
    setDarkMode(!darkMode);
    setThemeSetting({ darkMode: !darkMode });
  };

  return (
    <section className="w-28 h-screen px-5 py-10 flex flex-col justify-between border-r border-gray-150 dark:bg-gray-900">
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
          color="light"
          icon={faUser}
          hasTooltip
          tooltipName={t('header.friends')}
          tooltipPlacement="right"
          onClick={() => setSubFrame('friend')}
          isActive={subFrame === 'friend'}
        />
        <Button
          containerClassName="mt-8"
          variant="circle"
          color="light"
          icon={faUsers}
          hasTooltip
          tooltipName={t('header.groups')}
          tooltipPlacement="right"
          onClick={() => setSubFrame('group')}
          isActive={subFrame === 'group'}
        />
        <Button
          containerClassName="mt-8"
          variant="circle"
          color="light"
          icon={faFileAlt}
          hasTooltip
          tooltipName={t('header.documents')}
          tooltipPlacement="right"
          onClick={() => setSubFrame('document')}
          isActive={subFrame === 'document'}
        />
        <Button
          containerClassName="mt-8"
          variant="circle"
          color="light"
          icon={faBell}
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
          color="light"
          icon={faCog}
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
          color="light"
          icon={faMoon}
          hasTooltip
          tooltipName={t('header.dark_mode')}
          tooltipPlacement="right"
          onClick={handleChangeThemeMode}
        />
        <Button
          containerClassName="mt-8"
          variant="circle"
          color="light"
          icon={faPowerOff}
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
