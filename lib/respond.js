const url = require('url');
const path = require('path');
const fs = require('fs');
const buildbreadcrumb = require('./breadcrumb');
const buildmainContent = require('./mainContent');

const staticBasePath = path.join(__dirname, '..', 'static');

const respond = (req, res) => {
  let { pathname } = url.parse(req.url, true);
  pathname = decodeURIComponent(pathname);
  const fullstaticPath = path.join(staticBasePath, pathname);
  if (!fs.existsSync(fullstaticPath)) {
    console.log(`${fullstaticPath} does not exits`);
    res.write('404: File not found!');
    res.end();
    return false;
  }
  let stats;
  try {
    stats = fs.lstatSync(fullstaticPath);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  if (stats.isDirectory()) {
    let data = fs.readFileSync(path.join(staticBasePath, 'project_files/index.html'), 'utf-8');
    let pathElement = pathname.split('/').reverse();
    pathElement = pathElement.filter(element => element !== '');
    let folderName = pathElement[0];
    const breadcrumb = buildbreadcrumb(pathname);
    const mainContent = buildmainContent(fullstaticPath, pathname);

    if (pathElement.length === 0) {
      folderName = 'Home';
    }
    data = data.replace('page_title', folderName);
    data = data.replace('pathname', breadcrumb);
    data = data.replace('maintable', mainContent);


    let fileDetails = {};
    fileDetails.extname = path.extname(fullstaticPath);
    console.log(fileDetails.extname);


    res.statusCode = 200;
    res.write(data);
    res.end();
    // if (!stats.isFile()) {
    //   res.statusCode = 401;
    //   res.write('401: Access denied!');
    //   console.log('Not a file!');
    //   return res.end();
    // }


  }
}

module.exports = respond;