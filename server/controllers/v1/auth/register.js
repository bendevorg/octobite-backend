/**
 * @api {POST} /v1/register Register
 * @apiName Register
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email User email.
 * @apiParam {String} name User name.
 * @apiParam {String} password User password.
 * @apiParamExample {json} Request-example:
    {
      "email": "milkao@milk.com.br",
      "name": "Milk"
      "password": "jaca123"
    }
 * @apiSuccess (201) {String} data User data.
 * @apiSuccessExample {json} Success-Response:
    {
      "data": {
        "_id": "1",
        "email": "milkao@bendev.com",
        "name": "Milk",
        "__v": 0
      }
    }
 * @apiError (400) {String} data Error message.
 * @apiError (404) {String} data Error message.
 *
 * @apiErrorExample {json} 400:
    {
      "data": "\"password\" is not allowed to be empty"
    }
 * @apiErrorExample {json} 409:
    {
      "data": "Data sent is violating a unique constraint."
    }
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
