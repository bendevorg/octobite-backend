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
  if (err.name === constants.error.name.DOCUMENT_NOT_FOUND_ERROR) {
    let errorMessage;

    switch (req.route.path) {
      case constants.endpoints.SIGN_IN:
        errorMessage = constants.messages.error.INVALID_USER;
        break;
      default:
        errorMessage = constants.messages.error.DOCUMENT_NOT_FOUND;
        break;
    }

    return res.status(404).json({
      data: errorMessage,
    });
  }
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
  if (err.code === constants.error.name.INVALID_AUTH) {
    return res.status(401).json({
      data: constants.error.name.INVALID_AUTH,
    });
  }
  return res.status(500).json({
    data: constants.messages.error.UNEXPECTED_RUNNING,
  });
};
