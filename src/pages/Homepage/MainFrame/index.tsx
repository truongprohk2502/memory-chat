import Header from './Header';
import Chat from './Chat';
import MessageForm from './MessageForm';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import logo from 'assets/images/logo.png';
import { useTranslation } from 'react-i18next';

const MainFrame = () => {
  const { selectedContact } = useSelector((state: RootState) => state.contact);
  const { t } = useTranslation();

  return (
    <section className="fixed flex flex-col justify-between left-28 lg:left-124 transition-all duration-150 right-0 inset-y-0 border-l border-gray-150 bg-white dark:bg-gray-900 dark:border-gray-500">
      {selectedContact ? (
        <div className="w-full h-full relative">
          <Header />
          <Chat />
          <MessageForm />
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center">
              <img src={logo} alt="logo" className="w-12 h-12" />
            </div>
            <div className="font-bold mt-2 text-lg">{t('chat.welcome')}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MainFrame;
