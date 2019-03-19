import { camelizeKeys } from 'humps';

const byPeaks = (payload) => {
  const {
    molfile, peaks, layout, shift,
  } = payload;
  const jsonPeaks = JSON.stringify(peaks);
  const jsonShift = JSON.stringify(shift);
  const data = new FormData();
  data.append('molfile', molfile);
  data.append('layout', layout);
  data.append('peaks', jsonPeaks);
  data.append('shift', jsonShift);

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
