import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string()
    .email('login.email.errors.invalid')
    .required('login.email.errors.null'),
  password: Yup.string().required('login.password.errors.null'),
});
