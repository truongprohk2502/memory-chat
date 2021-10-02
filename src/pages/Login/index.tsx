import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import SignInSchema from 'validations/signIn.schema';
import SigningLayout from 'layouts/SigningLayout';
import { SigningInput } from 'components/SigningInput';
import { ROUTES } from 'constants/routes';

const LoginPage = () => {
  const { t } = useTranslation();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: SignInSchema,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <SigningLayout title={t('login.sign_in_with')}>
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
          <SigningInput
            title={t('login.email.title')}
            name="email"
            placeholder={t('login.email.placeholder')}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={errors.email && touched.email}
            error={t(errors.email)}
          />
          <SigningInput
            type="password"
            title={t('login.password.title')}
            linkTitle={t('login.forgot')}
            onClickLinkTitle={() => {}}
            name="password"
            placeholder={t('login.password.placeholder')}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={errors.password && touched.password}
            error={t(errors.password)}
          />
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
          href={ROUTES.REGISTRATION}
          className="text-gray-400 underline ml-1 transition duration-150 hover:text-blue-500"
        >
          {t('login.sign_up_now')}
        </a>
      </div>
    </SigningLayout>
  );
};

export default LoginPage;
