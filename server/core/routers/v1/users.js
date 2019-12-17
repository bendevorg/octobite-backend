const express = require('express');
const retrieveControllers = require('../../../utils/retrieveControllers');
const userMiddleware = require('../../../middlewares/userMiddleware');
const retrieveSchemas = require('../../../utils/retrieveSchemas');

const router = express.Router();

const controllers = retrieveControllers(
  __filename.split('/routers')[1].split('.')[0]
);
const schemas = retrieveSchemas(__filename.split('/routers')[1].split('.')[0]);

router.post('/wish', schemas.addWish, userMiddleware, controllers.addWish);
router.delete(
  '/wish',
  schemas.deleteWish,
  userMiddleware,
  controllers.deleteWish
);

module.exports = router;
