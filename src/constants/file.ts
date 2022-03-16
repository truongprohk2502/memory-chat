export const AVATAR_WIDTH_PERCENTAGE = 75;
export const ZOOM_RANGE_PERCENTAGE = 50;
export const AVATAR_CONTAINER_SIZE = 400;
export const AVATAR_CANVAS_SIZE = 100;

export const FILE_TYPES = {
  IMAGE_TYPES: ['image/gif', 'image/png', 'image/jpeg'],
  UPLOAD_TYPES: [
    {
      type: 'word',
      data: [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ],
    },
    {
      type: 'excel',
      data: [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
    },
    {
      type: 'powerpoint',
      data: [
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ],
    },
    {
      type: 'html',
      data: ['text/html'],
    },
    {
      type: 'json',
      data: ['application/json'],
    },
    {
      type: 'pdf',
      data: ['application/pdf'],
    },
    {
      type: 'txt',
      data: ['text/plain'],
    },
    {
      type: 'audio',
      data: ['audio/mp3'],
    },
  ],
};

export const LIMIT_SIZE = {
  IMAGE_SIZE: 5 * 1024 * 1024,
  FILE_SIZE: 50 * 1024 * 1024,
};
