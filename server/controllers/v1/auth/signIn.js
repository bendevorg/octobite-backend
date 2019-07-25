/**
 * @api {POST} /v1/sign_in POST example
 * @apiName Sign in
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 * @apiParamExample {json} Request-example:
    {
      "email": "milkao@milk.com.br",
      "password": "jaca123"
    }
 * @apiSuccess (200) {String} data User data.
 * @apiSuccessExample {json} Success-Response:
    {
      "data": {
        "_id": "1",
        "email": "milkao@bendev.com",
        "name": "Milk",
        "__v": 0
      }
    }
 * @apiError (404) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    {
      "data": "The email and password you entered do not correspond to an existing user."
    }
  *
  TODO: Finish documentation
 */

const findDatabase = require('../../../utils/findDatabase');
const hasher = require('../../../utils/hasher');
const constants = require('../../../utils/constants');

module.exports = (req, res, next) => {
  let { email, password } = req.body;
  email = email.trim();
  password = hasher(password, constants.values.cryptography.PASSWORD_KEY);

  findDatabase(constants.tables.USERS, { email, password }, 1)
    .then(user => {
      if (user) {
        delete user.password;
        return res.status(200).json({
          data: user,
        });
      }
      return res.status(404).json({
        data: constants.messages.error.INVALID_USER,
      });
    })
    .catch(err => {
      return next(err);
    });
};
