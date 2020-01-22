/**
 * @api {GET} /v1/user/wish Retrieve wishlist
 * @apiName User
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiSuccess (201) {String} data User data.
 * @apiSuccessExample {json} Success-Response:
    {
      "data": [
        "_id": "1",
        "email": "milkao@bendev.com",
        "name": "Milk",
        "__v": 0
      ]
    }
 * @apiError (400) {String} data Error message.
 * @apiError (404) {String} data Error message.
 *
 * @apiErrorExample {json} 400:
    {
      "data": "\"password\" is not allowed to be empty"
    }
 * @apiErrorExample {json} 409:
    {
      "data": "Data sent is violating a unique constraint."
    }
*/

const logger = require('javascript-custom-logger');
const findDatabase = require('../../../utils/findDatabase');
const constants = require('../../../utils/constants');

module.exports = async (req, res, next) => {
  let user = null;
  try {
    user = await findDatabase(
      constants.tables.USERS,
      { _id: req.user._id },
      constants.selections.USER_WITH_WISHLIST,
      0,
      1
    );
  } catch (err) {
    return next(err);
  }
  for (let i = 0; i < user.wishlist.length; i++) {
    let game;
    try {
      game = await findDatabase(
        constants.tables.GAMES,
        { _id: user.wishlist[i].id },
        [],
        0,
        1
      );
      const platforms = [];
      user.wishlist[i].platformIds.forEach(platformId => {
        const platformIndex = game.platforms.findIndex(
          platform => platform.gameId === platformId
        );
        if (platformIndex !== -1) {
          platforms.push(game.platforms[platformIndex]);
        }
      });
      game.platforms = platforms;
      user.wishlist[i] = game;
    } catch(err) {
      logger.error(err);
      user.wishlist.splice(i, 1);
      i--;
    }
  }
  return res.status(200).json({
    data: user.wishlist,
  });
};
