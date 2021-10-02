import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import SigningLayout from 'layouts/SigningLayout';
import { SigningInput } from 'components/SigningInput';
import SignUpSchema from 'validations/signUp.schema';
import { ROUTES } from 'constants/routes';

const Registration = () => {
  const { t } = useTranslation();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        address: '',
        phone: '',
        dob: '',
        gender: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: SignUpSchema,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <SigningLayout title={t('registration.registration_form')}>
      <form onSubmit={handleSubmit}>
        <SigningInput
          title={t('registration.firstName.title')}
          name="firstName"
          placeholder={t('registration.firstName.placeholder')}
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.firstName && touched.firstName}
          error={t(errors.firstName)}
        />
        <SigningInput
          title={t('registration.middleName.title')}
          name="middleName"
          placeholder={t('registration.middleName.placeholder')}
          value={values.middleName}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.middleName && touched.middleName}
          error={t(errors.middleName)}
        />
        <SigningInput
          title={t('registration.lastName.title')}
          name="lastName"
          placeholder={t('registration.lastName.placeholder')}
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.lastName && touched.lastName}
          error={t(errors.lastName)}
        />
        <SigningInput
          title={t('registration.email.title')}
          name="email"
          placeholder={t('registration.email.placeholder')}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.email && touched.email}
          error={t(errors.email)}
        />
        <SigningInput
          title={t('registration.address.title')}
          name="address"
          placeholder={t('registration.address.placeholder')}
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.address && touched.address}
          error={t(errors.address)}
        />
        <SigningInput
          title={t('registration.phone.title')}
          name="phone"
          placeholder={t('registration.phone.placeholder')}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.phone && touched.phone}
          error={t(errors.phone)}
        />
        <SigningInput
          type="date"
          title={t('registration.dob.title')}
          name="dob"
          value={values.dob}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.dob && touched.dob}
          error={t(errors.dob)}
        />
        <SigningInput
          type="radio-group"
          radioOptions={[
            { value: 'male', label: t('registration.gender.options.male') },
            { value: 'female', label: t('registration.gender.options.female') },
          ]}
          title={t('registration.gender.title')}
          name="gender"
          value={values.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.gender && touched.gender}
          error={t(errors.gender)}
        />
        <SigningInput
          type="password"
          title={t('registration.password.title')}
          name="password"
          placeholder={t('registration.password.placeholder')}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.password && touched.password}
          error={t(errors.password)}
        />
        <SigningInput
          type="password"
          title={t('registration.confirm_password.title')}
          name="confirmPassword"
          placeholder={t('registration.confirm_password.placeholder')}
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.confirmPassword && touched.confirmPassword}
          error={t(errors.confirmPassword)}
        />
        <button
          type="submit"
          className="px-6 py-3 text-lg font-bold transition duration-300 rounded-md mt-6 w-full text-white bg-blue-500 hover:bg-blue-600"
        >
          {t('registration.sign_up')}
        </button>
      </form>{' '}
      <div className="flex justify-center mt-5">
        <span className="text-gray-400">
          {t('registration.have_an_account')}
        </span>
        <a
          href={ROUTES.LOGIN}
          className="text-gray-400 underline ml-1 transition duration-150 hover:text-blue-500"
        >
          {t('registration.sign_in_here')}
        </a>
      </div>
    </SigningLayout>
  );
};

export default Registration;
