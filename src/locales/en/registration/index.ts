const translation = {
  firstName: {
    title: 'First name',
    placeholder: 'Enter your first name',
    errors: {
      null: 'Required first name',
    },
  },
  middleName: {
    title: 'Middle name',
    placeholder: 'Enter your middle name',
  },
  lastName: {
    title: 'Last name',
    placeholder: 'Enter your last name',
    errors: {
      null: 'Required last name',
    },
  },
  email: {
    title: 'Email',
    placeholder: 'Enter your email',
    errors: {
      invalid: 'Invalid email',
      null: 'Required email',
    },
  },
  gender: {
    title: 'Gender',
    options: {
      male: 'Male',
      female: 'Female',
    },
    errors: {
      null: 'Required gender',
    },
  },
  address: {
    title: 'Address',
    placeholder: 'Enter your address',
    errors: {
      null: 'Required address',
    },
  },
  phone: {
    title: 'Phone',
    placeholder: 'Enter you phone number',
    errors: {
      invalid: 'Invalid phone number',
      null: 'Required phone number',
    },
  },
  dob: {
    title: 'Date of birth',
    errors: {
      null: 'Required date of birth',
    },
  },
  password: {
    title: 'Password',
    placeholder: 'Enter password',
    errors: {
      too_short: 'Password must not be less than 5 characters',
      too_long: 'Password must not be greater than 20 characters',
      null: 'Required password',
    },
  },
  confirm_password: {
    title: 'Confirm password',
    placeholder: 'Enter confirm password',
    errors: {
      not_match: 'Password did not match',
      null: 'Required confirm password',
    },
  },
  registration_form: 'Registration Form',
  sign_up: 'Sign Up',
  have_an_account: 'Have already an account?',
  sign_in_here: 'Sign In Here',
  toasts: {
    sign_up_success: 'Sign up successfully',
    already_exist_email: 'Email aready exists',
    internal_server: 'An error occurred',
  },
};

export default translation;
