/**
 * @api {POST} /v1/auth/recovery Recovery
 * @apiName Recovery
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email User email.
 * @apiParamExample {json} Request-example:
    {
      "email": "milkao@milk.com.br",
    }
 * @apiSuccess (201) {String} data User data.
 * @apiSuccessExample {json} Success-Response:
    {
      "data": "Recovery email sent"
    }
*/

const findDatabase = require('../../../utils/findDatabase');
const generateSession = require('../../../utils/generateSession');
const sendEmail = require('../../../utils/sendEmail');
const constants = require('../../../utils/constants');

module.exports = (req, res, next) => {
  let { email } = req.body;
  email = email.trim();

  findDatabase(constants.tables.USERS, { email }, 0, 1)
    .then(user => {
      const jwt = generateSession(
        user._id,
        constants.values.cryptography.TOKEN_KEY,
        constants.values.cryptography.SESSION_SIGNATURE_KEY,
        constants.values.EXPIRATION_TIME_IN_SECONDS
      );

      const htmlBody = `
        This is an email to recovery your account on <b>Octobite</b>
        <br />
        If you did not start an account recovery please just ignore this email.
        <br />
        <br />
        To reset your password click <a href="https://octobite.com/recovery/${jwt}">here</a>
      `;

      sendEmail(email, `Password recovery`, htmlBody);
      
      return res.status(200).json({
        data: constants.messages.info.RECOVERY_SENT,
      });
    })
    .catch(err => {
      return next(err);
    });
};
