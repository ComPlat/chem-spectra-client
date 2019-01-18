import { LIST_LAYOUT, ToXY } from 'react-spectra-viewer';

const spectraDigit = (layout) => {
  switch (layout) {
    case LIST_LAYOUT.C13:
      return 1;
    case LIST_LAYOUT.IR:
      return 0;
    case LIST_LAYOUT.H1:
    case LIST_LAYOUT.PLAIN:
    default:
      return 2;
  }
};

const fixDigit = (input, precision) => {
  const output = input || 0.0;
  return output.toFixed(precision);
};

const writePeaksBody = (peaks, layout, isAscend) => {
  const peaksXY = ToXY(peaks);
  const digit = spectraDigit(layout);
  const result = peaksXY.map(p => fixDigit(parseFloat(p[0]), digit));

  const ascendFunc = (a, b) => a - b;
  const descendFunc = (a, b) => b - a;
  const sortFunc = isAscend ? ascendFunc : descendFunc;

  const ordered = result.sort(sortFunc).join(', ');
  return ordered;
};

const buildData = (target) => {
  if (!target) return { isExist: false };
  const sp = target && target.spectrum;
  const input = sp ? sp.data[0] : {};
  const xLabel = sp ? `X (${sp.xUnit})` : '';
  const yLabel = sp ? `Y (${sp.yUnit})` : '';
  const peakObjs = target && target.peakObjs;
  return {
    input, xLabel, yLabel, peakObjs, isExist: true,
  };
};

const toPeakStr = (peaks) => {
  const arr = peaks.map(p => `${p.x},${p.y}`);
  const str = arr.join('#');
  return str;
};

const spectraOps = {
  PLAIN: { head: '', tail: '.' },
  '1H': { head: '1H = ', tail: '.' },
  '13C': { head: '13C = ', tail: '.' },
  IR: { head: 'IR = ', tail: 'cm-1' },
};

export {
  writePeaksBody, toPeakStr, buildData, spectraDigit, spectraOps,
};
