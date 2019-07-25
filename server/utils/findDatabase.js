const database = require('../models/database');

module.exports = (table, filter = {}) => {
  return new Promise((resolve, reject) => {
    database[table]
      .find(filter)
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
