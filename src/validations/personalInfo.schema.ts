import * as Yup from 'yup';

export default Yup.object().shape({
  fullName: Yup.string().required('setting.personal_info.errors.name.null'),
  email: Yup.string()
    .required('setting.personal_info.errors.email.null')
    .email('setting.personal_info.errors.email.invalid'),
  phone: Yup.string()
    .required('setting.personal_info.errors.phone.null')
    .matches(/^[0-9]*$/, 'setting.personal_info.errors.phone.invalid'),
  address: Yup.string().required('setting.personal_info.errors.address.null'),
});
