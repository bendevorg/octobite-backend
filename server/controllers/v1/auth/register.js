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

const database = require('../../../models/database');
const hasher = require('../../../utils/hasher');
const constants = require('../../../utils/constants');

module.exports = (req, res) => {
  let { email, name, password } = req.body;
  email = email.trim();
  name = name.trim();
  password = hasher(password, constants.values.cryptography.PASSWORD_KEY);

  const newUser = new database.Users({ email, name, password });
  newUser.save((err, user) => {
    return res.status(200).json({
      data: user,
    });
  });
};
