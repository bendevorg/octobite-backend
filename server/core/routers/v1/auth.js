const express = require('express');
const retrieveControllers = require('../../../utils/retrieveControllers');
const retrieveSchemas = require('../../../utils/retrieveSchemas');

const router = express.Router();

const controllers = retrieveControllers(
  __filename.split('/routers')[1].split('.')[0]
);
const schemas = retrieveSchemas(__filename.split('/routers')[1].split('.')[0]);

router.post('/sign_in', schemas.signIn, controllers.signIn);

module.exports = router;
