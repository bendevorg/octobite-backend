const jwt = require('jsonwebtoken');
const encryptor = require('./encryptor');

module.exports = (
  userInformation,
  encryptKey,
  signatureKey,
  expirationTime
) => {
  const token = encryptor(userInformation, encryptKey);

  return jwt.sign({ token }, signatureKey, {
    expiresIn: expirationTime,
  });
};
