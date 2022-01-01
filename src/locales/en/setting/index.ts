const translation = {
  personal_info: {
    title: 'Personal info',
    buttons: {
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
    },
    labels: {
      first_name: 'First name',
      middle_name: 'Middle name',
      last_name: 'Last name',
      email: 'Email',
      gender: 'Gender',
      dob: 'Date of birth',
      phone: 'Phone',
      address: 'Address',
    },
    errors: {
      first_name: {
        null: 'Required first name',
      },
      last_name: {
        null: 'Required last name',
      },
      gender: {
        null: 'Required gender',
      },
      dob: {
        null: 'Required date of birth',
      },
      phone: {
        null: 'Required phone',
        invalid: 'Invalid phone',
      },
      address: {
        null: 'Required address',
      },
    },
    toasts: {
      updated_info_success: 'Updated user information successfully',
      not_exist_email: 'Email is not exist',
      internal_server: 'An error has occurred',
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
      setting_devices: {
        title: 'Setting devices',
        buttons: {
          open_modal: 'Open setting modal',
          audio_setting: 'Audio setting',
          video_setting: 'Video setting',
          test_microphone: 'Test microphone',
          test_speaker: 'Test your speaker',
          recording: 'Recording',
          playing: 'Playing',
        },
        microphone: 'Microphone',
        speaker: 'Speaker',
        block_microphone: 'Microphone is blocked',
        no_microphone: 'No microphone available',
        no_speaker: 'No speaker available',
      },
    },
  },
  avatar_setting: {
    buttons: {
      discard: 'Discard',
      cancel: 'Cancel',
      save: 'Save',
    },
    toasts: {
      invalid_file_type: 'File must be an image',
      updated_avatar_success: 'Updated avatar image successfully',
    },
    setting_avatar: 'Select avatar',
    drop_here: 'Drop the file here',
    drag_or_click: 'Drag and drop image file here, or click to select file',
  },
};

export default translation;
