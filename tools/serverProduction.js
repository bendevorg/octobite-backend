/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const router = require('../server/core/router.js');

const app = express();

app.use('/', router);

module.exports = app;
