import { camelizeKeys } from 'humps';

const convertFile = ({ file, scan }) => {
  const data = new FormData();
  data.append('file', file);
  data.append('scan', scan);

  const promise = fetch(
    '/api/v1/chemspectra/file/convert',
    {
      credentials: 'same-origin',
      method: 'post',
      body: data,
    },
  ).then(response => response.json())
    .then(json => camelizeKeys(json))
    .catch((err) => {
      console.log(err); // eslint-disable-line
    });

  return promise;
};

const saveFile = (target) => {
  const {
    src, filename, peakStr, shift,
  } = target;

  const data = new FormData();
  data.append('file', src);
  data.append('filename', filename);
  data.append('peaks_str', peakStr);
  data.append('shift_select_x', shift.peak.x);
  data.append('shift_ref_name', shift.ref.name);
  data.append('shift_ref_value', shift.ref.value);

  const promise = fetch(
    '/api/v1/chemspectra/file/save',
    {
      credentials: 'same-origin',
      method: 'post',
      body: data,
    },
  ).then(response => response.blob())
    .then((blob) => {
      const a = document.createElement('a');
      a.style = 'display: none';
      document.body.appendChild(a);
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = `${filename}.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((err) => {
      console.log(err); // eslint-disable-line
    });

  return promise;
};

const FetcherFile = {
  convertFile, saveFile,
};

export default FetcherFile;
