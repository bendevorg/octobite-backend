const joi = require('joi');

const schema = joi.object().keys({
  username: joi
    .string()
    .min(3)
    .required(),
  password: joi
    .string()
    .min(3)
    .required(),
});

module.exports = (req, res, next) => {
  joi.validate(req.body, schema, (err, value) => {
    if (!err) return next();
    else {
      return res.status(400).json({
        data: err.details[0].message,
      });
    }
  });
};
