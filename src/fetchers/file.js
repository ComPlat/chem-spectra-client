import 'whatwg-fetch';
import { camelizeKeys } from 'humps';

const convertFile = (file) => {
  const data = new FormData();
  data.append('file', file);

  const promise = fetch(
    '/api/v1/chemspectra/file',
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

const Fetcher = {
  convertFile,
};

export default Fetcher;
