import Header from './Header';
import Chat from './Chat';
import MessageForm from './MessageForm';

const MainFrame = () => {
  return (
    <section className="fixed flex flex-col justify-between left-28 lg:left-124 transition-all duration-150 right-0 inset-y-0 border-l border-gray-150 bg-white dark:bg-gray-900 dark:border-gray-500">
      <Header />
      <Chat />
      <MessageForm />
    </section>
  );
};

export default MainFrame;
