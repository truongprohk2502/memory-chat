import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import SignInSchema from 'validations/signIn.schema';
import SigningLayout from 'layouts/SigningLayout';
import { SigningInput } from 'components/SigningInput';
import { ROUTES } from 'constants/routes';
import { RootState } from 'reducers';
import { useDispatch, useSelector } from 'react-redux';
import { FullSpinner } from 'components/FullSpinner';
import { toast } from 'react-toastify';
import { getSendResetPasswordRequest, postSignInRequest } from 'reducers/auth';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { pending, verifyingEmail, sendResetPasswordSuccess, error, userInfo } =
    useSelector((state: RootState) => state.auth);

  const {
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: values => {
      dispatch(postSignInRequest(values));
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(t(`login.toasts.${error}`));
    }
  }, [error, t]);

  useEffect(() => {
    if (sendResetPasswordSuccess) {
      toast.success(t('login.toasts.send_reset_password_success'));
    }
  }, [sendResetPasswordSuccess, t]);

  useEffect(() => {
    if (userInfo) {
      userInfo.isActive && history.replace(ROUTES.HOMEPAGE);
      setFieldValue('email', userInfo.email);
    }
  }, [userInfo, setFieldValue, history]);

  const handleForgotPassword = () => {
    if (/^\S+@\S+\.\S+$/.test(values.email)) {
      dispatch(getSendResetPasswordRequest(values.email));
    } else {
      toast.error(t('login.toasts.required_email'));
    }
  };

  return (
    <SigningLayout title={t('login.sign_in_with')}>
      <div>
        {verifyingEmail && (
          <div className="rounded-md shadow-xl px-5 py-2 bg-red-500 text-white">
            {t('login.verifying_email')}
          </div>
        )}
        {sendResetPasswordSuccess && (
          <div className="rounded-md shadow-xl px-5 py-2 bg-red-500 text-white">
            {t('login.reset_password')}
          </div>
        )}
        <div
          className={`my-${
            verifyingEmail || sendResetPasswordSuccess ? 5 : 10
          } flex justify-between`}
        >
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
            onClickLinkTitle={handleForgotPassword}
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
      {pending && <FullSpinner />}
    </SigningLayout>
  );
};

export default LoginPage;
