import {
  faBell,
  faCog,
  faFileAlt,
  faMoon,
  faPowerOff,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from 'assets/images/logo.png';
import { Button } from 'components/Button';

const Header = () => {
  return (
    <section className="w-28 h-screen px-5 py-10 flex flex-col justify-between border-r border-gray-150">
      <div className="w-full flex flex-col items-center">
        <img src={logo} alt="logo" className="w-12 h-12" />
        <img
          src="https://chitchat-react.vercel.app/assets/images/contact/2.jpg"
          alt="logo"
          className="w-12 h-12 object-cover rounded-full border-4 border-blue-500 mt-16"
        />
        <Button
          className="mt-8"
          variant="circle"
          color="light"
          icon={<FontAwesomeIcon icon={faUser} />}
        />
        <Button
          className="mt-8"
          variant="circle"
          color="light"
          icon={<FontAwesomeIcon icon={faUsers} />}
        />
        <Button
          className="mt-8"
          variant="circle"
          color="light"
          icon={<FontAwesomeIcon icon={faFileAlt} />}
        />
        <Button
          className="mt-8"
          variant="circle"
          color="light"
          icon={<FontAwesomeIcon icon={faBell} />}
        />
        <Button
          className="mt-8"
          variant="circle"
          color="light"
          icon={<FontAwesomeIcon icon={faCog} />}
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <Button
          className="mt-8"
          variant="circle"
          color="light"
          icon={<FontAwesomeIcon icon={faMoon} />}
        />
        <Button
          className="mt-8"
          variant="circle"
          color="light"
          icon={<FontAwesomeIcon icon={faPowerOff} />}
        />
      </div>
    </section>
  );
};

export default Header;
