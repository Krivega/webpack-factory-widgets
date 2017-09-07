require('marko/node-require');
const express = require('express');
const path = require('path');
const markoExpress = require('marko/express');
const indexTemplate = require('../../views/index.marko');

const root = path.resolve(__dirname, '../../');
const public = path.resolve(root, 'public');

module.exports = function startServer() {
  const app = express();

  app.use(markoExpress()); //enable res.marko(template, data)
  
  app.use(express.static(public));

  app.get('/', function(req, res) {
    console.log(res.locals)
    res.marko(indexTemplate, res.locals);
  });

  return app;
};
