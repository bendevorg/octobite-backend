const database = require('../models/database');

module.exports = (table, filter = {}, limit = 10) => {
  return new Promise((resolve, reject) => {
    if (limit === 1) {
      return database[table]
        .findOne(filter)
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
