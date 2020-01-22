const express = require('express');
const constants = require('../../../utils/constants');
const retrieveControllers = require('../../../utils/retrieveControllers');
const retrieveSchemas = require('../../../utils/retrieveSchemas');

const router = express.Router();

const controllers = retrieveControllers(
  __filename.split('/routers')[1].split('.')[0]
);
const schemas = retrieveSchemas(__filename.split('/routers')[1].split('.')[0]);

router.post(constants.endpoints.SIGN_IN, schemas.signIn, controllers.signIn);
router.post(
  constants.endpoints.REGISTER,
  schemas.register,
  controllers.register
);
router.post(constants.endpoints.SIGN_OUT, controllers.signOut);
router.post(
  constants.endpoints.RECOVERY,
  schemas.recovery,
  controllers.recovery
);
router.post(
  constants.endpoints.RECOVERY_CONFIRM,
  schemas.changePassword,
  controllers.changePassword
);

module.exports = router;
