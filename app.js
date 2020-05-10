const http = require('http');

const respond = require('./lib/respond');
const port = 3000;

const server = http.createServer(respond);

server.listen(port, () => console.log(`Listening on port ${port}`));