import axios from 'axios';
import FileDownload from 'js-file-download';

export const downloadFile = (fileName: string, originalName: string) => {
  axios
    .get(`${process.env.REACT_APP_API_ENDPOINT}/${fileName}`, {
      responseType: 'blob',
    })
    .then(res => {
      FileDownload(res.data, originalName);
    })
    .catch(err => console.error(err));
};
