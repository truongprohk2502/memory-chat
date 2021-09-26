import errorImage from 'assets/images/error.gif';
import { useTranslation } from 'react-i18next';

interface IProps {
  code: 403 | 404;
}

const ErrorPage = ({ code }: IProps) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex flex-col items-center relative">
        <span className="font-arvo text-8xl absolute top-0 inset-x-auto">
          {code}
        </span>
        <img src={errorImage} alt="error" />
        <div className="absolute bottom-0 flex flex-col items-center">
          <span className="text-center text-3xl mb-2">
            {t('error.error_title')}
          </span>
          <span className="text-center">
            {code === 404
              ? t('error.not_found_description')
              : t('error.unauthorized_description')}
          </span>
          <button className="px-4 py-2 mt-4 bg-lightGreen text-white rounded-md">
            {t('error.home_button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
