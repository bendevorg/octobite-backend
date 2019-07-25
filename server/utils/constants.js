module.exports = {
  values: {
    cryptography: {
      PASSWORD_KEY: process.env.PASSWORD_KEY,
    },
  },
  messages: {
    error: {
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
    code: {
      UNIQUE_CONSTRAINT: 11000,
    },
  },
};
