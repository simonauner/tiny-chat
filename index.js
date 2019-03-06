// to be able to use es6 imports in node
require('@babel/register')();

const server = require('./server/index.js');
server.startServer();
