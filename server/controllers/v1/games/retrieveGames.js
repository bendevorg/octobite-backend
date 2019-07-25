/**
 * @api {GET} /games/ List games
 * @apiName List games
 * @apiGroup Games
 * @apiVersion 1.0.0
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
module.exports = (req, res) => {
  findDatabase(constants.tables.GAMES)
    .then(games => {
      return res.status(200).json({
        data: games,
      });
    })
    .catch(err => {
      return res.status(err.status).json({
        data: err.message,
      });
    });
};
