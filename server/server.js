'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const config        = require('./config.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + config.clientPath));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(8080, "0.0.0.0", function () {
  console.log('Server at 8080!');
});

module.exports = app;
