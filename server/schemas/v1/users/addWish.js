const joi = require('joi');

const schema = joi.object().keys({
  id: joi.string().required(),
  platformId: joi
    .array()
    .items(joi.string())
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
