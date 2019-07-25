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

module.exports = (req, res, next) => {
  let { email, name, password } = req.body;
  email = email.trim();
  name = name.trim();
  password = hasher(password, constants.values.cryptography.PASSWORD_KEY);
  const newUser = { email, name, password };
  return insertDatabase(constants.tables.USERS, newUser)
    .then(newRegister => {
      delete newRegister.password;
      return res.status(201).json({
        data: newRegister,
      });
    })
    .catch(err => {
      return next(err);
    });
};
