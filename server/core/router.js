const express = require('express');
const bodyParser = require('body-parser');
const retrieveRouters = require('../utils/retrieveRouters');

const routersPath = `${process.cwd()}/server/core/routers`;
const errorMiddleware = require('../controllers/errorMiddleware');

let router = express.Router();
router.use(bodyParser.json());
router = retrieveRouters(router, routersPath);

router.use(errorMiddleware);

module.exports = router;
