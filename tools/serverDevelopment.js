/* eslint-disable no-console */
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const router = require('../server/core/router.js');

dotenv.config();

const app = express();

app.use('/', router);
app.use(morgan('tiny'));

module.exports = app;
