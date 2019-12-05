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

/**
 * Validate if the input is a valid not empty string
 *
 * @param {string} stringToValidate - String to be validated
 * @return {boolean} - True case the string is valid and false if it is not
 */
exports.isValidString = stringToValidate => {
  return (
    typeof stringToValidate === 'string' && stringToValidate.trim().length > 0
  );
};
