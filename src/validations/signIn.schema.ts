import * as Yup from 'yup';

export default Yup.object().shape({
  username: Yup.string().required('login.username.errors.null'),
  password: Yup.string().required('login.password.errors.null'),
});
