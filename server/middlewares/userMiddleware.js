/**
 * Middleware to restrict user authentication
 * @module controllers/userMiddleware
 *
 */

const tokenDecryptor = require('../utils/tokenDecryptor');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const findDatabase = require('../utils/findDatabase');
const { InvalidSession } = require('../utils/errors');

/**
 * Check if user`s token is valid
 *
 * @param {string} req.headers.cookies- User`s API Key
 * @return {callback} - Calls the API
 * @throws {json} - Throws a message with the error info
 */
module.exports = (req, res, next) => {
  if (!req.cookies || !validator.isValidString(req.cookies.session)) {
    return next(new InvalidSession());
  }

  let userData = tokenDecryptor(
    req.cookies.session,
    constants.values.TOKEN_ENCRYPT_KEY
  );

  if (!userData) {
    return next(new InvalidSession());
  }

  return findDatabase(constants.tables.USERS, { userData }, 0, 1, false)
    .then(user => {
      if (!user) {
        return next(new InvalidSession());
      }
      req.user = user;
      return next();
    })
    .catch(err => {
      return next(err);
    });
};
