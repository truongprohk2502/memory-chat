import * as Yup from 'yup';

export default Yup.object().shape({
  oldPassword: Yup.string().required('registration.oldPassword.errors.null'),
  newPassword: Yup.string()
    .min(5, 'registration.password.errors.too_short')
    .max(20, 'registration.password.errors.too_long')
    .required('registration.password.errors.null'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('newPassword')],
      'registration.confirm_password.errors.not_match',
    )
    .required('registration.confirm_password.errors.null'),
});
