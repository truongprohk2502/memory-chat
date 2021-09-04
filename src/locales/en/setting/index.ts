const translation = {
  title: 'Setting',
  options: {
    personal_info: {
      title: 'Personal info',
      buttons: {
        edit: 'Edit',
        save: 'Save',
        cancel: 'Cancel',
      },
      labels: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
      },
      errors: {
        name: {
          null: 'Required full name',
        },
        email: {
          null: 'Required email',
          invalid: 'Invalid email',
        },
        phone: {
          null: 'Required phone',
          invalid: 'Invalid phone',
        },
        address: {
          null: 'Required address',
        },
      },
    },
    system: {
      title: 'System',
      options: {
        language: {
          title: 'Language',
          options: {
            english: 'English',
            vietnamese: 'Vietnamese',
          },
        },
        sound_notification: 'Sound notification',
        desktop_notification: {
          title: 'Desktop notification',
          errors: {
            unsupport: 'Unsupport desktop notification',
            denied: 'Notification is denied',
          },
        },
      },
    },
  },
};

export default translation;
