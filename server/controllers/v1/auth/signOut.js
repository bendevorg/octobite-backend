/**
 * @api {POST} /v1/sign_out Sign out
 * @apiName Sign out
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {String} data User data.
 * @apiSuccessExample {json} Success-Response:
    {
    }
*/

const constants = require('../../../utils/constants');

module.exports = (req, res) => {
  res.clearCookie(constants.values.cookies.SESSION);
  return res.status(200).json();
};
