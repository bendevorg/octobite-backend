const database = require('../models/database');
const constants = require('./constants');

module.exports = (table, filter = {}, offset = 0, limit = constants.values.MINIMUM_GAMES_LIMIT, lean = true) => {
  return new Promise((resolve, reject) => {
    if (limit === 1) {
      return database[table]
        .findOne(filter)
        .orFail()
        .lean(lean)
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });
    }
    return database[table]
      .find(filter)
      .orFail()
      .skip(Number.isNaN(offset) ? 0 : Number(offset))
      .limit(Number.isNaN(limit) ? 0 : Number(limit))
      .lean(lean)
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
