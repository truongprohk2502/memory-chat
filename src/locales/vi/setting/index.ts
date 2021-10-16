const translation = {
  personal_info: {
    title: 'Thông tin cá nhân',
    buttons: {
      edit: 'Sửa',
      save: 'Lưu',
      cancel: 'Thoát',
    },
    labels: {
      first_name: 'Tên',
      middle_name: 'Tên đệm',
      last_name: 'Họ',
      email: 'Email',
      gender: 'Giới tính',
      dob: 'Ngày sinh',
      phone: 'Số điện thoại',
      address: 'Địa chỉ',
    },
    errors: {
      first_name: {
        null: 'Yêu cầu tên',
      },
      last_name: {
        null: 'Yêu cầu họ',
      },
      gender: {
        null: 'Yêu cầu giới tính',
      },
      dob: {
        null: 'Yêu cầu ngày sinh',
      },
      phone: {
        null: 'Yêu cầu số điện thoại',
        invalid: 'Số điện thoại không hợp lệ',
      },
      address: {
        null: 'Yêu cầu địa chỉ',
      },
    },
    toasts: {
      updated_info_success: 'Cập nhật thông tin người dùng thành công',
      not_exist_email: 'Email không tồn tại',
      internal_server: 'Đã có lỗi xảy ra',
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
};

export default translation;
