const database = require('../models/database');

module.exports = (table, id, newObject) => {
  return new Promise((resolve, reject) => {
    return database[table]
      .findByIdAndUpdate(id, newObject, { new: true, useFindAndModify: false })
      .orFail()
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
