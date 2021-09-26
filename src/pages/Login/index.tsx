import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { SIGNING_INPUT } from 'constants/classNames';
import SignInSchema from 'validations/signIn.schema';

const LoginPage = () => {
  const { t } = useTranslation();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: SignInSchema,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <div className="bg-signing bg-no-repeat bg-fixed bg-cover min-h-screen flex justify-center items-center">
      <div className="rounded-md w-11/12 md:w-signing min-h-screen-3/4 px-28 py-20 bg-white flex flex-col justify-between">
        <div className="text-center text-4xl">{t('login.sign_in_with')}</div>
        <div>
          <div className="my-10 flex justify-between">
            <button className="bg-facebook rounded-md px-6 py-3 text-lg font-bold text-white w-64 transition duration-300 hover:opacity-80">
              <FontAwesomeIcon icon={faFacebookSquare} />
              <span className="ml-2">Facebook</span>
            </button>
            <button className="bg-red-500 rounded-md px-6 py-3 text-lg font-bold text-white w-64 transition duration-300 hover:bg-red-400">
              <FontAwesomeIcon icon={faGoogle} />
              <span className="ml-2">Google</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-500 mb-2">
                {t('login.username.title')}
              </span>
              <input
                type="text"
                name="username"
                value={values.username}
                className={SIGNING_INPUT}
                placeholder={t('login.username.placeholder')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && touched.username && (
                <span className="text-red-500 text-sm mt-2">
                  {t(errors.username)}
                </span>
              )}
            </div>
            <div className="flex flex-col mt-4">
              <div className="mb-2">
                <span className="font-bold text-lg text-gray-500">
                  {t('login.password.title')}
                </span>
                <span className="text-lg underline text-gray-400 ml-2 cursor-pointer">
                  {t('login.forgot')}
                </span>
              </div>
              <input
                type="password"
                name="password"
                value={values.password}
                className={SIGNING_INPUT}
                placeholder={t('login.password.placeholder')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <span className="text-red-500 text-sm mt-2">
                  {t(errors.password)}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 text-lg font-bold transition duration-300 rounded-md mt-6 w-full text-white bg-blue-500 hover:bg-blue-600"
            >
              {t('login.sign_in')}
            </button>
          </form>
        </div>
        <div className="flex justify-center">
          <span className="text-gray-400">{t('login.not_a_member')}</span>
          <a
            href="/"
            className="text-gray-400 underline ml-1 transition duration-150 hover:text-blue-500"
          >
            {t('login.sign_up_now')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
