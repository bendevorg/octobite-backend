const constants = require('./constants');

class NotFound extends Error {
  constructor(...args) {
    super(...args);
    this.name = constants.error.name.NOT_FOUND;
    Error.captureStackTrace(this, NotFound);
  }
}

class InvalidAuth extends Error {
  constructor(...args) {
    super(...args);
    this.name = constants.error.name.INVALID_AUTH;
    Error.captureStackTrace(this, InvalidAuth);
  }
}

class InvalidSession extends Error {
  constructor(...args) {
    super(...args);
    this.name = constants.error.name.INVALID_SESSION;
    Error.captureStackTrace(this, InvalidSession);
  }
}

module.exports = {
  NotFound,
  InvalidAuth,
  InvalidSession,
};
