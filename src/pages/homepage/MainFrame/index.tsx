import Header from './Header';
import Chat from './Chat';

const MainFrame = () => {
  return (
    <section className="fixed left-28 lg:left-124 transition-all duration-150 right-0 inset-y-0 border-l border-gray-150 bg-white dark:bg-gray-900 dark:border-gray-500">
      <Header />
      <Chat />
    </section>
  );
};

export default MainFrame;
