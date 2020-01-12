module.exports = {
  values: {
    cryptography: {
      PASSWORD_KEY: process.env.PASSWORD_KEY,
      TOKEN_KEY: process.env.TOKEN_KEY,
      RECOVERY_TOKEN_KEY: process.env.RECOVERY_TOKEN_KEY,
      SESSION_SIGNATURE_KEY: process.env.SESSION_SIGNATURE_KEY,
      RECOVERY_SIGNATURE_KEY: process.env.RECOVERY_SIGNATURE_KEY,
    },
    EXPIRATION_TIME_IN_SECONDS: 60 * 60 * 24 * 30,
    RECOVERY_EXPIRATION_TIME_IN_SECONDS: 60 * 60 * 24,
    cookies: {
      DOMAIN: process.env.DOMAIN,
      SESSION: 'session',
    },
    MINIMUM_GAMES_LIMIT: 10,
  },
  selections: {
    USER_WITH_ONLY_ID_DATA: ['_id'],
    USER_WITH_PROFILE_DATA: ['_id', 'name', 'email'],
    USER_WITH_PASSWORD_DATA: ['_id', 'password'],
    USER_WITH_WISHLIST: ['_id', 'wishlist'],
    USER_WITH_FULL_DATA: ['_id', 'email', 'password', 'wishlist'],
  },
  messages: {
    error: {
      DOCUMENT_NOT_FOUND: 'No data found.',
      UNEXPECTED_RUNNING:
        'An unexpected error ocurred while processing your request. Please try again.',
      INVALID_USER:
        'The email and password you entered do not correspond to an existing user.',
      UNAUTHORIZED:
        'You need to be logged in to access this feature.',
      UNEXPECTED_DB:
        'An error ocurred while accessing our database. Please try again.',
      UNIQUE_CONSTRAINT: 'Data sent is violating a unique constraint.',
      INVALID_PLATFORM_ID:
        'The platform Id you are trying to insert is invalid.',
    },
    info: {
      RECOVERY_SENT: 'Recovery email sent',
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
      NOT_FOUND: 'NotFoundError',
      INVALID_AUTH: 'InvalidAuthError',
      INVALID_SESSION: 'InvalidSessionError',
      INVALID_PLATFORM_ID: 'InvalidPlatformId',
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
