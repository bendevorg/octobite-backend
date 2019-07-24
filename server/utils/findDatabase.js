const database = require('../models/database');
const constants = require('./constants');

module.exports = (table, filter = {}) => {
  return new Promise((resolve, reject) => {
    database[table]
      .find(filter)
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        return reject(constants.messages.error.UNEXPECTED_DB);
      });
  });
};
