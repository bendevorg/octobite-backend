module.exports = {
  values: {
    cryptography: {
      PASSWORD_KEY: process.env.PASSWORD_KEY,
    },
  },
  messages: {
    error: {
      UNEXPECTED_DB:
        'An error ocurred while accessing our database. Please try again.',
    },
  },
  tables: {
    GAMES: 'Games',
    USERS: 'Users',
  },
};
