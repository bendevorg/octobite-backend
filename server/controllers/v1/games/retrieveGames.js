/**
 * @api {GET} /v1/games/ List games
 * @apiName List games
 * @apiGroup Games
 * @apiVersion 1.1.0
 *
 * @apiSuccess (201) {String} data Games data.
 * @apiSuccessExample {json} Success-Response:
    {
      "data": [{
        "_id": "1",
        "name": "super milk bros",
        "platform": "Switch",
        "value": 50,25
        "__v": 0
      }],
      "total": 5800,
      "remaining": 5000
    }
 * @apiError (400) {String} data Error message.
 * @apiError (404) {String} data Error message.
 *
 * @apiErrorExample {json} 409:
    {
      "data": "Data sent is violating a unique constraint."
    }
*/

const constants = require('../../../utils/constants');
const findDatabase = require('../../../utils/findDatabase');
const cache = require('../../../../tools/cache');
const countDatabase = require('../../../utils/countDatabase');

/**
 * List Games
 *
 * @param {string} req.query.active - Rooms filter state
 * @return {object} - Returns the room in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res, next) => {
  const { offset, amount, name, platforms, range, onSale } = req.query;
  let filters = { $and: [] };
  const cacheKey = req.baseUrl.concat(
    offset,
    amount,
    name,
    platforms,
    range,
    onSale
  );
  const cachedGames = cache.get(cacheKey);

  if (cachedGames) {
    return res.status(200).json({
      data: cachedGames,
    });
  }
  if (name) {
    filters.$and.push({ name: { $regex: new RegExp(name, 'gi') } });
  }
  if (platforms) {
    const platformsArray = platforms.split(',');
    filters.$and.push({ 'platforms.name': { $in: platformsArray } });
  }
  if (onSale === 'true') {
    filters.$and.push({ 'platforms.discountPercent': { $gt: 0 } });
  }
  if (range) {
    const rangeArray = range.split(',');
    if (rangeArray.length === 2) {
      filters.$and.push({
        'platforms.priceWithDiscount.value': {
          $gte: Number(rangeArray[0]),
          $lte: Number(rangeArray[1]),
        },
      });
    }
  }
  if (filters.$and.length === 0) {
    filters = {};
  }
  findDatabase(constants.tables.GAMES, filters, [], { score: -1 }, offset, amount)
    .then(async games => {
      let total = -1;
      let remaining = -1;
      try {
        total = await countDatabase(constants.tables.GAMES, filters);
        remaining =
          total -
          ((Number.isNaN(offset) || !offset ? 0 : Number(offset)) +
            (Number.isNaN(amount) || !amount
              ? constants.values.MINIMUM_GAMES_LIMIT
              : Number(amount)));
      } catch (err) {
        return next(err);
      }
      res.status(200).json({
        data: {
          games,
          total,
          remaining,
        },
      });
      cache.set(cacheKey, { games, total, remaining });
      cache.ttl(cacheKey, constants.values.CACHE_TTL_IN_SECONDS);
      return;
    })
    .catch(err => {
      return next(err);
    });
};
