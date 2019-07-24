/* eslint-disable no-console */
const dotenv = require('dotenv');
const express = require('express');
const router = require('../server/core/router.js');

dotenv.config();

const app = express();

app.use('/', router);

module.exports = app;
