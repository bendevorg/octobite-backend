/**
 * Module to hash data
 * @module utils/hasher
 */
const crypto = require('crypto-js');

/**
 * Hash a data
 *
 * @param {string} data - Data to be hashed
 * @param {string} key - Key to hash the data
 * @return {object} - Returns the data hashed
 * @throws {object} - Returns -1 that indicates a fail
 *
 */
module.exports = (data, key) => {
  try {
    if (!data || !key) return false;
    let hashedData;
    if (data instanceof Object)
      hashedData = crypto.HmacSHA256(JSON.stringify(data), key).toString();
    else hashedData = crypto.HmacSHA256(data.toString(), key).toString();
    return hashedData;
  } catch (err) {
    return false;
  }
};
