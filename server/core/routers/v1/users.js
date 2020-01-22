const express = require('express');
const retrieveControllers = require('../../../utils/retrieveControllers');
const userMiddleware = require('../../../middlewares/userMiddleware');
const retrieveSchemas = require('../../../utils/retrieveSchemas');
const constants = require('../../../utils/constants');

const router = express.Router();

const controllers = retrieveControllers(
  __filename.split('/routers')[1].split('.')[0]
);
const schemas = retrieveSchemas(__filename.split('/routers')[1].split('.')[0]);

router.get('/wishlist', userMiddleware, controllers.retrieveWishlist);
router.post(
  constants.endpoints.WISH,
  schemas.addWish,
  userMiddleware,
  controllers.addWish
);
router.patch(
  constants.endpoints.WISH,
  schemas.deleteWish,
  userMiddleware,
  controllers.deleteWish
);

module.exports = router;
