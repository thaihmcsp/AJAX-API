const express = require('express');
const router = require('./router/router.js');
const AccountModel = require('./data/data.js');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use('/api/account/',router);

app.listen(3000);