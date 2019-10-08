/**
 * Middleware to restrict user authentication
 * @module controllers/userMiddleware
 *
 */

const tokenDecryptor = require('../utils/tokenDecryptor');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const database = require('../models/database');

/**
 * Check if user`s token is valid
 *
 * @param {string} req.headers.cookies- User`s API Key
 * @return {callback} - Calls the API
 * @throws {json} - Throws a message with the error info
 */
module.exports = (req, res, next) => {
  if (!req.cookies || !validator.isValidString(req.cookies.session)) {
    return res.status(401).json({
      msg: constants.messages.error.INVALID_LOGIN,
    });
  }

  let userData = tokenDecryptor(
    req.cookies.session,
    constants.values.TOKEN_ENCRYPT_KEY
  );

  if (!userData) {
    return res.status(401).json({
      msg: constants.messages.error.INVALID_LOGIN,
    });
  }

  return database.Users.findById(
    userData._id,
    '_id username notificationSettings summary',
    (err, user) => {
      if (err) {
        return res.status(500).json({
          msg: constants.messages.error.UNEXPECTED_DB,
        });
      }
      if (!user) {
        return res.status(401).json({
          msg: constants.messages.error.INVALID_LOGIN,
        });
      }

      req.user = user;
      return next();
    }
  );
};
