const joi = require('joi');

const schema = joi.object().keys({
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .min(3)
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
