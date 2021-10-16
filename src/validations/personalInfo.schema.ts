import * as Yup from 'yup';

export default Yup.object().shape({
  firstName: Yup.string().required(
    'setting.personal_info.errors.first_name.null',
  ),
  lastName: Yup.string().required(
    'setting.personal_info.errors.last_name.null',
  ),
  gender: Yup.string().required('setting.personal_info.errors.gender.null'),
  dob: Yup.string().required('setting.personal_info.errors.dob.null'),
  phone: Yup.string()
    .required('setting.personal_info.errors.phone.null')
    .matches(
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      'setting.personal_info.errors.phone.invalid',
    ),
  address: Yup.string().required('setting.personal_info.errors.address.null'),
});
