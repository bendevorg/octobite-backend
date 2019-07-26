/**
 * @api {POST} /example/hey POST example
 * @apiName Hey exaple
 * @apiGroup Example
 * @apiVersion 0.0.1
 *
 * @apiParam {String} Example Example's body string
 * @apiParamExample {json} Request-example:
 * {
 *     "example": "Test"
 * }
 * @apiSuccess (200) {String} data Hey.
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "data": "example is missing or is not correctly formatted." }
  *
 */

const hasher = require('../../../utils/hasher');
const constants = require('../../../utils/constants');
const insertDatabase = require('../../../utils/insertDatabase');
const generateSession = require('../../../utils/generateSession');

module.exports = (req, res, next) => {
  let { email, name, password } = req.body;
  email = email.trim();
  name = name.trim();
  password = hasher(password, constants.values.cryptography.PASSWORD_KEY);
  const newUser = { email, name, password };
  return insertDatabase(constants.tables.USERS, newUser)
    .then(newRegister => {
      const jwt = generateSession(
        newRegister._id,
        constants.values.cryptography.TOKEN_KEY,
        constants.values.cryptography.SESSION_SIGNATURE_KEY,
        constants.values.EXPIRATION_TIME_IN_SECONDS
      );

      res.cookie(constants.values.cookies.SESSION, jwt, {
        expires: new Date(
          Date.now() + constants.values.EXPIRATION_TIME_IN_SECONDS * 1000
        ),
      });

      delete newRegister.password;
      return res.status(201).json({
        data: newRegister,
      });
    })
    .catch(err => {
      return next(err);
    });
};
