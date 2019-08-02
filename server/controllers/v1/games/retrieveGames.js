/**
 * @api {GET} /v1/games/ List games
 * @apiName List games
 * @apiGroup Games
 * @apiVersion 1.0.0
 *
 * @apiSuccess (201) {String} data Games data.
 * @apiSuccessExample {json} Success-Response:
    {
      "data": {
        "_id": "1",
        "name": "super milk bros",
        "platform": "Switch",
        "value": 50,25
        "__v": 0
      }
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

const constants = require('../../../utils/constants');
const findDatabase = require('../../../utils/findDatabase');

/**
 * List Games
 *
 * @param {string} req.query.active - Rooms filter state
 * @return {object} - Returns the room in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res, next) => {
  findDatabase(constants.tables.GAMES)
    .then(games => {
      return res.status(200).json({
        data: games,
      });
    })
    .catch(err => {
      return next(err);
    });
};
