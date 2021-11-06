import { useCallback, useEffect, useRef, useState } from 'react';
import { Modal } from 'components/Modal';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import {
  AVATAR_CONTAINER_SIZE,
  AVATAR_WIDTH_PERCENTAGE,
  IMAGE_TYPES,
  ZOOM_RANGE_PERCENTAGE,
} from 'constants/file';
import { toast } from 'react-toastify';
import useResizeAvatar, { ICutOffPostition } from 'hooks/useResizeAvatar';
import { getTranslateNumber } from 'utils/getTranslateNumber';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { postAvatarRequest, resetUpdateSuccessState } from 'reducers/auth';
import { RootState } from 'reducers';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IPosition {
  x: number;
  y: number;
}

export const UploadAvatarModal = ({ isOpen, onClose }: IProps) => {
  const [scale, setScale] = useState<number>(0);
  const [file, setFile] = useState<File>(null);
  const [imageRatio, setImageRatio] = useState<number>(1);
  const [maxTranslateX, setMaxTranslateX] = useState<number>(0);
  const [maxTranslateY, setMaxTranslateY] = useState<number>(0);
  const [mouseDownPosition, setMouseDownPosition] = useState<IPosition>(null);
  const [translateRange, setTranslateRange] = useState<IPosition>({
    x: 0,
    y: 0,
  });
  const [fromPosition, setFromPosition] = useState<ICutOffPostition>(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { updateAvatarSuccess } = useSelector((state: RootState) => state.auth);

  const imageContainerRef = useRef<HTMLImageElement>(null);

  const [dataBlob, resetDataBlob] = useResizeAvatar(file, fromPosition);

  useEffect(() => {
    if (updateAvatarSuccess) {
      handleReset();
      dispatch(resetUpdateSuccessState());
      onClose();
      resetDataBlob();
      toast.success(t('setting.avatar_setting.toasts.updated_avatar_success'));
    }
  }, [updateAvatarSuccess, resetDataBlob, onClose, t, dispatch]);

  useEffect(() => {
    console.log(dataBlob);

    if (dataBlob) {
      const formData = new FormData();
      formData.append('file', dataBlob, 'avatar.png');
      dispatch(postAvatarRequest(formData));
    }
  }, [dataBlob, dispatch]);

  const onDrop = useCallback(
    (files: File[]) => {
      const getImageRatio = event => {
        const image = new Image();

        image.src = event.target.result;

        image.onload = function () {
          setImageRatio(image.width / image.height);
        };
      };

      const file = files[0];
      const reader = new FileReader();
      reader.addEventListener('load', getImageRatio);

      if (!IMAGE_TYPES.includes(file.type)) {
        toast.error(t('setting.avatar_setting.toasts.invalid_file_type'));
      } else {
        reader.readAsDataURL(file);
        setFile(file);
      }

      return () => {
        reader.removeEventListener('load', getImageRatio);
      };
    },
    [t],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    setScale(AVATAR_WIDTH_PERCENTAGE);
  }, []);

  useEffect(() => {
    if (imageContainerRef.current) {
      let maxTranslateX: number;
      let maxTranslateY: number;

      if (imageRatio <= 1) {
        imageContainerRef.current.style.width = `${scale}%`;
        maxTranslateX =
          (AVATAR_CONTAINER_SIZE * (scale - AVATAR_WIDTH_PERCENTAGE)) / 200;
        maxTranslateY =
          (AVATAR_CONTAINER_SIZE *
            (scale / imageRatio - AVATAR_WIDTH_PERCENTAGE)) /
          200;
      } else {
        imageContainerRef.current.style.width = `${scale * imageRatio}%`;
        maxTranslateX =
          (AVATAR_CONTAINER_SIZE *
            (scale * imageRatio - AVATAR_WIDTH_PERCENTAGE)) /
          200;
        maxTranslateY =
          (AVATAR_CONTAINER_SIZE * (scale - AVATAR_WIDTH_PERCENTAGE)) / 200;
      }

      setMaxTranslateX(maxTranslateX);
      setMaxTranslateY(maxTranslateY);

      const { translateX, translateY } = getTranslateNumber(
        imageContainerRef.current,
      );

      if (
        Math.abs(translateX) > maxTranslateX ||
        Math.abs(translateY) > maxTranslateY
      ) {
        const newTranslateX =
          Math.abs(translateX) > maxTranslateX
            ? translateX < 0
              ? -maxTranslateX
              : maxTranslateX
            : translateX;
        const newTranslateY =
          Math.abs(translateY) > maxTranslateY
            ? translateY < 0
              ? -maxTranslateY
              : maxTranslateY
            : translateY;
        imageContainerRef.current.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
      }
    }
  }, [scale, imageRatio]);

  useEffect(() => {
    const handleMouseMove = event => {
      if (mouseDownPosition) {
        const { x: oldTranslateX, y: oldTranslateY } = translateRange;
        const { x, y } = mouseDownPosition;
        const mouseMoveX = event.clientX - x + oldTranslateX;
        const mouseMoveY = event.clientY - y + oldTranslateY;
        const translateX =
          Math.abs(mouseMoveX) < maxTranslateX
            ? mouseMoveX
            : mouseMoveX < 0
            ? -maxTranslateX
            : maxTranslateX;
        const translateY =
          Math.abs(mouseMoveY) < maxTranslateY
            ? mouseMoveY
            : mouseMoveY < 0
            ? -maxTranslateY
            : maxTranslateY;
        imageContainerRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDownPosition, maxTranslateX, maxTranslateY, translateRange]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (imageContainerRef.current) {
        const { translateX, translateY } = getTranslateNumber(
          imageContainerRef.current,
        );
        setTranslateRange({ x: translateX, y: translateY });
      }
      setMouseDownPosition(null);
    };

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.addEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleReset = () => {
    setScale(AVATAR_WIDTH_PERCENTAGE);
    setFile(null);
    setImageRatio(1);
    setMaxTranslateX(0);
    setMaxTranslateY(0);
    setMouseDownPosition(null);
    setTranslateRange({ x: 0, y: 0 });
    setFromPosition(null);
  };

  const handleMouseDown = event => {
    setMouseDownPosition({ x: event.clientX, y: event.clientY });
  };

  const handleUpload = () => {
    if (imageContainerRef) {
      const { x: translateX, y: translateY } = translateRange;

      const imageWidth =
        imageRatio < 1
          ? (scale * AVATAR_CONTAINER_SIZE) / 100
          : (imageRatio * scale * AVATAR_CONTAINER_SIZE) / 100;

      const fromX = (maxTranslateX - translateX) / imageWidth;
      const fromY = (imageRatio * (maxTranslateY - translateY)) / imageWidth;
      setFromPosition({ fromX, fromY, scale });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleUpload}
      onCancel={file ? handleReset : onClose}
      confirmText={t('setting.avatar_setting.buttons.save')}
      cancelText={
        file
          ? t('setting.avatar_setting.buttons.discard')
          : t('setting.avatar_setting.buttons.cancel')
      }
      title={t('setting.avatar_setting.setting_avatar')}
      disabledConfirmButton={!file}
      className="select-none"
    >
      {file ? (
        <>
          <div className="flex flex-auto justify-center items-center mx-auto w-100 h-100 overflow-hidden relative">
            <div ref={imageContainerRef} className="absolute inset-auto">
              <img
                className="w-full"
                src={URL.createObjectURL(file)}
                alt="img"
              />
            </div>
            <div
              onMouseDown={handleMouseDown}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(transparent calc(${
                  AVATAR_WIDTH_PERCENTAGE / 200
                } * 25rem), rgba(255, 255, 255, 0.5) calc(${
                  AVATAR_WIDTH_PERCENTAGE / 200
                } * 25rem))`,
              }}
            ></div>
          </div>
          <input
            className="flex-1 mt-2"
            type="range"
            min={AVATAR_WIDTH_PERCENTAGE}
            max={AVATAR_WIDTH_PERCENTAGE + ZOOM_RANGE_PERCENTAGE}
            step={1}
            value={scale}
            onChange={e => setScale(+e.target.value)}
          />
        </>
      ) : (
        <div
          {...getRootProps()}
          className="flex flex-col justify-center items-center w-100 h-100 border-gray-500 border border-dashed rounded-lg"
        >
          <input {...getInputProps()} />
          <FontAwesomeIcon icon={faCloudUploadAlt} className="text-5xl mb-4" />
          {isDragActive ? (
            <p>{t('setting.avatar_setting.drop_here')}</p>
          ) : (
            <p>{t('setting.avatar_setting.drag_or_click')}</p>
          )}
        </div>
      )}
    </Modal>
  );
};
