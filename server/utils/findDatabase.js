const database = require('../../models/database');
const constants = require('../../utils/constants');

module.exports = (table, filter) => {
  database[table]
    .find(filter)
    .then(result => {
      return res.status(200).json({
        data: result,
      });
    })
    .catch(err => {
      return res.status(500).json({
        data: constants.messages.error.UNEXPECTED_DB,
      });
    });
};
