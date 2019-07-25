/**
 * @api {POST} /v1/signIn POST example
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

const database = require('../../../models/database');
const hasher = require('../../../utils/hasher');
const constants = require('../../../utils/constants');

module.exports = (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = hasher(password, constants.values.cryptography.PASSWORD_KEY);

  database.Users.findOne({
    email,
    password,
  })
    .then(user => {
      if (user) {
        const userDataToReturn = user.toObject();
        delete userDataToReturn.password;

        return res.status(200).json({
          data: userDataToReturn,
        });
      }
      return res.status(404).json({
        data: constants.messages.error.INVALID_USER,
      });
    })
    .catch(e => {
      return res.status(500).json({
        data: constants.messages.error.UNEXPECTED_DB,
      });
    });
};
