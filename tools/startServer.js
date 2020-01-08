/* eslint-disable no-console */
const dotenv = require('dotenv');
const logger = require('javascript-custom-logger');
const app =
  process.env.NODE_ENV === 'production'
    ? require('./serverProduction')
    : require('./serverDevelopment');

dotenv.config();
const { PORT } = process.env;

app.listen(PORT, error => {
  if (error) {
    logger.error(error);
  } else {
    logger.info({ message: `🌎  Server is listening on port ${PORT}.` });
  }
});
