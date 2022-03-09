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
      setting_devices: {
        title: 'Cài đặt thiết bị',
        buttons: {
          open_modal: 'Mở cửa sổ cài đặt',
          audio_setting: 'Cài đặt âm thanh',
          video_setting: 'Cài đặt máy quay',
          test_microphone: 'Kiểm tra mic',
          test_speaker: 'Kiểm tra loa',
          recording: 'Đang thu âm',
          playing: 'Đang chơi',
        },
        microphone: 'Mic thu',
        speaker: 'Loa',
        block_microphone: 'Mic thu đã bị khóa',
        block_camera: 'Máy quay đã bị khóa',
        no_microphone: 'Không có mic thu nào',
        no_camera: 'Không có máy quay nào',
        no_speaker: 'Không có loa nào',
        mirror_video: 'Hiệu ứng gương cho video',
        high_quality: 'Video chất lượng cao',
      },
    },
  },
  avatar_setting: {
    buttons: {
      discard: 'Hủy bỏ',
      cancel: 'Thoát',
      save: 'Lưu',
    },
    toasts: {
      invalid_file_type: 'Tệp phải là một hình ảnh',
      updated_avatar_success: 'Cập nhật ảnh đại diện thành công',
    },
    setting_avatar: 'Chọn hình đại diện',
    drop_here: 'Thả tệp vào đây',
    drag_or_click:
      'Kéo và thả tệp hình ảnh vào đây, hoặc click chuột để chọn ảnh',
  },
  password_setting: {
    title: 'Thay đổi mật khẩu',
    labels: {
      old_password: 'Mật khẩu cũ',
      new_password: 'Mật khẩu mới',
      confirm_password: 'Xác nhận mật khẩu',
    },
    toasts: {
      updated_password_success: 'Cập nhật mật khẩu thành công',
      incorrect_password: 'Mật khẩu cũ không đúng',
    },
  },
};

export default translation;
