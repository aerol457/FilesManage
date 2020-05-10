const { execSync } = require('child_process');

const countdirsize = (fullpath) => {
  const pathcleaned = fullpath.replace(/\s/g, '\ ');
  const commandoutput = execSync(`du -sh "${pathcleaned}"`).toString();

  let filesize = commandoutput.replace(/\s/g, '');
  filesize = filesize.split('C:');
  filesize = filesize[0];

  const unitDir = filesize.replace(/\d|\./g, '');
  const sizedirNum = parseFloat(filesize.replace(/[a-z]/i, ''));
  const units = "BKMGT";
  const sizeBytes = sizedirNum * Math.pow(1000, units.indexOf(unitDir));
  return [filesize, sizeBytes];
}

module.exports = countdirsize;