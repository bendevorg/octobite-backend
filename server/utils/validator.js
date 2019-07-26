/**
 * Validate if the input is a valid JSON
 * @param {string} JSONToValidate - JSON to be validated
 * @return {boolean} - True case the JSON is valid and false if it is not
 *
 */
exports.isValidJSON = JSONToValidate => {
  try {
    JSON.parse(JSONToValidate);
  } catch (err) {
    return false;
  }
  return true;
};
