/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('../server/core/router.js');

const app = express();

app.use(
  cors({
    origin: ['https://octobite.com', 'https://www.octobite.com', 'http://octobite.com', 'octobite.com'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use('/', router);

module.exports = app;
