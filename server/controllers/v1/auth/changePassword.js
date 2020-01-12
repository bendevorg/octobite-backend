/**
 * @api {POST} /v1/auth/recovery/confirm Confirm recovery
 * @apiName Confirm recovery
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} token Recovery's token.
 * @apiParam {String} password User password.
 * @apiParamExample {json} Request-example:
    {
      "token": "djakl123.asdkj1239.vjakt8321.xzjcn123",
      "password": "jaca123"
    }
 * @apiSuccess (200) {String} data User data.
 * @apiSuccessExample {json} Success-Response:
    {
      "data": {}
    }
 * @apiError (400) {String} data Error message.
 * @apiError (404) {String} data Error message.
 *
 * @apiErrorExample {json} 400:
    {
      "data": "\"password\" is not allowed to be empty"
    }
 * @apiErrorExample {json} 404:
    {
      "data": "The token does not correspond to a valid token."
    }
*/

const findDatabase = require('../../../utils/findDatabase');
const updateDatabase = require('../../../utils/updateDatabase');
const hasher = require('../../../utils/hasher');
const tokenDecryptor = require('../../../utils/tokenDecryptor');
const generateSession = require('../../../utils/generateSession');
const constants = require('../../../utils/constants');

module.exports = async (req, res, next) => {
  const { token } = req.body;
  let { password } = req.body;
  password = hasher(password, constants.values.cryptography.PASSWORD_KEY);

  let _id = '';
  try {
    _id = tokenDecryptor(
      token,
      constants.values.cryptography.SESSION_SIGNATURE_KEY
    );
  } catch(err) {
    return next(err);
  }

  let user = '';
  try {
    user = await findDatabase(constants.tables.USERS, { _id }, constants.selections.USER_WITH_PASSWORD_DATA, 0, 1);
  } catch(err) {
    return next(err);
  }
  
  user.password = password;
  let newUser = {};
  try {
    newUser = await updateDatabase(constants.tables.USERS, user._id, user);
  } catch(err) {
    return next(err);
  }
  
  const jwt = generateSession(
    newUser._id,
    constants.values.cryptography.TOKEN_KEY,
    constants.values.cryptography.SESSION_SIGNATURE_KEY,
    constants.values.EXPIRATION_TIME_IN_SECONDS
  );

  res.cookie(constants.values.cookies.SESSION, jwt, {
    domain: constants.values.cookies.DOMAIN,
    expires: new Date(
      Date.now() + constants.values.EXPIRATION_TIME_IN_SECONDS * 1000
    ),
  });

  delete user.password;
  return res.status(200).json({
    data: user,
  });
};
