const translation = {
  title: 'Cài đặt',
  options: {
    personal_info: {
      title: 'Thông tin cá nhân',
      buttons: {
        edit: 'Sửa',
        save: 'Lưu',
        cancel: 'Thoát',
      },
      labels: {
        name: 'Họ tên',
        email: 'Email',
        phone: 'Số điện thoại',
        address: 'Địa chỉ',
      },
      errors: {
        name: {
          null: 'Yêu cầu họ tên',
        },
        email: {
          null: 'Yêu cầu email',
          invalid: 'Email không hợp lệ',
        },
        phone: {
          null: 'Yêu cầu số điện thoại',
          invalid: 'Số điện thoại không hợp lệ',
        },
        address: {
          null: 'Yêu cầu địa chỉ',
        },
      },
    },
    system: {
      title: 'Hệ thông',
      options: {
        language: {
          title: 'Ngôn ngữ',
          options: {
            english: 'Tiếng Anh',
            vietnamese: 'Tiếng Việt',
          },
        },
      },
    },
  },
};

export default translation;
