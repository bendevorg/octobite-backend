const database = require('../models/database');

module.exports = (table, register) => {
  return new Promise((resolve, reject) => {
    new database[table](register)
      .save()
      .then(result => {
        return resolve(result.toObject());
      })
      .catch(err => {
        return reject(err);
      });
  });
};
