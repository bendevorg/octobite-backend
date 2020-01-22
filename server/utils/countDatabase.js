const database = require('../models/database');

module.exports = (table, filter = {}) => {
  return new Promise((resolve, reject) => {
    return database[table]
      .where(filter)
      .countDocuments()
      .then(count => {
        return resolve(count);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
