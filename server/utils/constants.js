module.exports = {
  values: {
    cryptography: {
      PASSWORD_KEY: process.env.PASSWORD_KEY,
      TOKEN_KEY: process.env.TOKEN_KEY,
      SESSION_SIGNATURE_KEY: process.env.SESSION_SIGNATURE_KEY,
    },
    EXPIRATION_TIME_IN_SECONDS: 60 * 60 * 24 * 30,
    cookies: {
      SESSION: 'session',
    },
  },
  messages: {
    error: {
      DOCUMENT_NOT_FOUND: 'No data found.',
      UNEXPECTED_RUNNING:
        'An unexpected error ocurred while processing your request. Please try again.',
      INVALID_USER:
        'The email and password you entered do not correspond to an existing user.',
      UNEXPECTED_DB:
        'An error ocurred while accessing our database. Please try again.',
      UNIQUE_CONSTRAINT: 'Data sent is violating a unique constraint',
    },
  },
  tables: {
    GAMES: 'Games',
    USERS: 'Users',
  },
  error: {
    name: {
      DOCUMENT_NOT_FOUND_ERROR: 'DocumentNotFoundError',
      VALIDATION_ERROR: 'ValidationError',
    },
    code: {
      UNIQUE_CONSTRAINT: 11000,
    },
  },
  endpoints: {
    REGISTER: '/register',
    SIGN_IN: '/sign_in',
  },
};
