import { AVATAR_CANVAS_SIZE, AVATAR_WIDTH_PERCENTAGE } from 'constants/file';
import { useCallback, useEffect, useState } from 'react';

export interface ICutOffPostition {
  fromX: number;
  fromY: number;
  scale: number;
}

const useResizeAvatar = (
  file: File,
  fromPosition: ICutOffPostition,
): [Blob, () => void] => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement>(null);
  const [dataBlob, setDataBlob] = useState<Blob>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = AVATAR_CANVAS_SIZE;
    canvas.height = AVATAR_CANVAS_SIZE;

    setCanvas(canvas);

    return () => {
      canvas.remove();
    };
  }, []);

  useEffect(() => {
    if (file) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      setImage(image);

      return () => {
        image.remove();
      };
    }
  }, [file]);

  useEffect(() => {
    const getCropImage = () => {
      const { fromX, fromY, scale } = fromPosition;
      const { width, height } = image;

      const imageSize =
        width <= height
          ? (width * AVATAR_WIDTH_PERCENTAGE) / scale
          : (height * AVATAR_WIDTH_PERCENTAGE) / scale;

      canvas
        .getContext('2d')
        .drawImage(
          image,
          fromX * width,
          fromY * height,
          imageSize,
          imageSize,
          0,
          0,
          AVATAR_CANVAS_SIZE,
          AVATAR_CANVAS_SIZE,
        );

      const dataURI = canvas.toDataURL('image/png');

      const byteString =
        dataURI.split(',')[0].indexOf('base64') >= 0
          ? atob(dataURI.split(',')[1])
          : unescape(dataURI.split(',')[1]);

      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const dataBlob = new Blob([ia], { type: mimeString });
      setDataBlob(dataBlob);
    };

    if (image && canvas && fromPosition) {
      getCropImage();
    }
    return () => {};
  }, [image, canvas, fromPosition]);

  const handleResetDataBlob = useCallback(() => {
    console.log('reset roi');

    setDataBlob(null);
    setImage(null);
  }, []);

  return [dataBlob, handleResetDataBlob];
};

export default useResizeAvatar;
