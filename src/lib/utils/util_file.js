const VerifyJcampExt = (file) => {
  const filename = file && file.name;
  if (!filename) return false;
  const last = filename.split('.').length - 1;
  const ext = filename.split('.')[last];
  const acceptables = ['jdx', 'JDX', 'dx', 'DX', 'JCAMP', 'jcamp'];
  return acceptables.indexOf(ext) >= 0;
};


const VerifyRawExt = (file) => {
  const filename = file && file.name;
  if (!filename) return false;
  const last = filename.split('.').length - 1;
  const ext = filename.split('.')[last];
  const acceptables = ['raw', 'RAW'];
  return acceptables.indexOf(ext) >= 0;
};


const kb = 1024;
const mb = 1024 * kb;
const sizeLimit = 10 * mb;

const VerifySize = (file) => {
  const filesize = file && file.size;
  if (!filesize) return false;

  return filesize <= sizeLimit;
};


export { VerifyJcampExt, VerifyRawExt, VerifySize };
