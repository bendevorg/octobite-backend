const joi = require('joi');

const schema = joi.object().keys({
  token: joi
    .string()
    .min(4)
    .required(),
  password: joi
    .string()
    .min(4)
    .required(),
});

module.exports = (req, res, next) => {
  joi.validate(req.body, schema, err => {
    if (!err) {
      return next();
    }
    return next(err);
  });
};
