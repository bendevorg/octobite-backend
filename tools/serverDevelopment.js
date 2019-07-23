/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('../server/core/router.js');

const app = express();

app.use('/', router);
app.use(morgan('tiny'));

module.exports = app;
