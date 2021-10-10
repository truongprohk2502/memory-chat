import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { getLanguage } from 'utils/storage';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'routes';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

const App = () => {
  const { i18n } = useTranslation();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const lng = getLanguage();
    lng && i18n.changeLanguage(lng);
  }, [i18n]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Router />
    </div>
  );
};

export default App;
