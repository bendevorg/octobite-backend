const express = require('express');
const bodyParser = require('body-parser');
const logger = require('javascript-custom-logger');
const retrieveRouters = require('../utils/retrieveRouters');

const routersPath = `${process.cwd()}/server/core/routers`;
const errorMiddleware = require('../middlewares/errorMiddleware');

let router = express.Router();
router.use(bodyParser.json());
router.use(logger.middleware);
router = retrieveRouters(router, routersPath);
router.use(errorMiddleware);

module.exports = router;
