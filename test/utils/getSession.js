/**
 * Module to get session data
 * @module utils/getSessionData
 */
const request = require('request');
const constants = require('../../server/utils/constants');

/**
 * Get session's data from Auth backend
 *
 * @param {string}  - Session data
 * @return {object} - Returns the data encrypted
 * @throws {object} - Returns -1 that indicates a fail
 *
 */
module.exports = (email, password) => {
  return new Promise((resolve, reject) => {
    body = {
      email,
      password,
    };

    request.post(
      { url: 'http://localhost:8085/v1/auth/sign_in', json: body },
      (err, httpResponse, body) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(body);
        }
      }
    );
  });
};
