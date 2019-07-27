const database = require('../models/database');

module.exports = (table, filter = {}, limit = 10) => {
  return new Promise((resolve, reject) => {
    if (limit === 1) {
      return database[table]
        .findOne(filter)
        .orFail()
        .lean()
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
      .limit(limit)
      .lean()
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
