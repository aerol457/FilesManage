const fs = require('fs');
const path = require('path');
const countsizedir = require('./countsizedir');
const countsizefile = require('./countsizefile');
const mainContent = (fullpath, pathname) => {
  try {
    const dirDetails = {};
    let maindirectory = '';
    let items = fs.readdirSync(fullpath);
    items.forEach(item => {
      dirDetails.name = item;
      dirDetails.link = path.join(pathname, item);
      dirDetails.path = path.join(fullpath, item);
      dirDetails.stats = fs.lstatSync(dirDetails.path);

      if (!dirDetails.stats.isDirectory()) {
        dirDetails.icon = 'document';
        [dirDetails.size, dirDetails.sizeByBytes] = countsizefile(dirDetails.stats);
      } else {
        dirDetails.icon = 'folder';
        [dirDetails.size, dirDetails.sizeByBytes] = countsizedir(dirDetails.path);
      }
      dirDetails.timeStamp = parseInt(dirDetails.stats.mtimeMs);
      dirDetails.dateTime = new Date(dirDetails.timeStamp);
      dirDetails.dateTime = dirDetails.dateTime.toLocaleString();

      maindirectory += `        
      <tr data-name= "${dirDetails.name}" data-size= "${dirDetails.sizeByBytes}" data-time = "${dirDetails.timeStamp}">
        <td><a href="${dirDetails.link}">
        <ion-icon name="${dirDetails.icon}-outline"></ion-icon> ${dirDetails.name}
        </a></td>
        <td>${dirDetails.size}</td>
        <td>${dirDetails.dateTime}</td>
      </tr>`;
    })
    return maindirectory;
  } catch (err) {
    console.log(`Error: ${err}`)
  }
}

module.exports = mainContent;