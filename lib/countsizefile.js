
const countdirsize = (stats) => {
  const filesizeBytes = stats.size;
  const units = "BKMGT";
  const index = Math.floor(Math.log10(filesizeBytes) / 3);
  const filesize = (filesizeBytes / Math.pow(1000, index)).toFixed(1);
  const fullfilesize = filesize + units[index];
  return [fullfilesize, filesizeBytes];
}

module.exports = countdirsize;