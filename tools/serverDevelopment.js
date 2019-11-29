/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('../server/core/router.js');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use('/', router);
app.use(morgan('tiny'));

module.exports = app;
