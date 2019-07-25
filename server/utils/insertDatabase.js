const database = require('../models/database');
const constants = require('./constants');

module.exports = (table, register) => {
  return new Promise((resolve, reject) => {
    new database[table](register)
      .save()
      .then(result => {
        return resolve(result.toObject());
      })
      .catch(err => {
        if (err.code === constants.error.code.UNIQUE_CONSTRAINT) {
          return reject({
            status: 409,
            message: constants.messages.error.UNIQUE_CONSTRAINT,
          });
        }
        return reject({
          status: 500,
          message: constants.messages.error.UNEXPECTED_DB,
        });
      });
  });
};
