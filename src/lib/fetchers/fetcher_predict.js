import { camelizeKeys } from 'humps';

const byPeaks = (payload) => {
  const { molfile, peaks, layout } = payload;
  const data = new FormData();
  data.append('molfile', molfile);
  data.append('peaks', peaks);
  data.append('layout', layout);

  const promise = fetch(
    '/api/v1/chemspectra/predict/by_peaks_form',
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

const FetcherPredict = {
  byPeaks,
};

export default FetcherPredict;
