import * as Yup from 'yup';

export default Yup.object().shape({
  firstName: Yup.string().required('registration.firstName.errors.null'),
  lastName: Yup.string().required('registration.lastName.errors.null'),
  email: Yup.string()
    .email('login.email.errors.invalid')
    .required('login.email.errors.null'),
  gender: Yup.string().required('registration.gender.errors.null'),
  address: Yup.string().required('registration.address.errors.null'),
  phone: Yup.string()
    .matches(/^[0-9]*$/, 'registration.phone.errors.invalid')
    .required('registration.phone.errors.null'),
  dob: Yup.string().required('registration.dob.errors.null'),
  password: Yup.string()
    .min(5, 'registration.password.errors.too_short')
    .max(20, 'registration.password.errors.too_long')
    .required('registration.password.errors.null'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password')],
      'registration.confirm_password.errors.not_match',
    )
    .required('registration.confirm_password.errors.null'),
});
