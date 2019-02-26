import { camelizeKeys } from 'humps';

const byPeaks = (payload) => {
  const jsonData = JSON.stringify(payload);

  const promise = fetch(
    '/api/v1/chemspectra/predict/by_peaks',
    {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: jsonData,
    },
  ).then(response => response.json())
    .then(json => camelizeKeys(json))
    .catch((err) => {
      console.log(err); // eslint-disable-line
    });

  return promise;
};

const FetcherPredict = {
  byPeaks,
};

export default FetcherPredict;
