const translation = {
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
      sound_notification: 'Âm thanh thông báo',
      desktop_notification: {
        title: 'Thông báo trên desktop',
        errors: {
          unsupport: 'Không hỗ trợ thông báo',
          denied: 'Quyền thông báo bị từ chối',
        },
      },
    },
  },
  chat: {
    actions: {
      profile: 'Thông tin cá nhân',
      delete: 'Xóa liên hệ',
      block: 'Chặn liên hệ',
    },
  },
};

export default translation;
