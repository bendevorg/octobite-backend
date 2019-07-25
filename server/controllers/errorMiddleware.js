/**
 * Module to handle errors
 * @module controllers/errorMiddleware
 */

/**
 * Handle all errors in our app. Must call next(err) on a controller to be used
 *
 * @param {string} err - Data to be hashed
 * @param {string} req - Key to hash the data
 * @param {string} req - Key to hash the data
 * @param {string} req - Key to hash the data
 * @return {data} - Error message
 *
 */

const constants = require('../utils/constants');
 // eslint-disable-next-line
module.exports = (err, req, res, next) => {
  if (err.name === constants.error.name.VALIDATION_ERROR) {
    return res.status(400).json({
      data: err.details[0].message,
    });
  }
  if (err.code === constants.error.code.UNIQUE_CONSTRAINT) {
    return res.status(409).json({
      data: constants.messages.error.UNIQUE_CONSTRAINT,
    });
  }
  console.log(err);
  return res.status(500).json({
    data: constants.messages.error.UNEXPECTED_RUNNING,
  });
};
