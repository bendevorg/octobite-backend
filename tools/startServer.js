/* eslint-disable no-console */
const dotenv = require('dotenv');
const app =
  process.env.NODE_ENV === 'production'
    ? require('./serverProduction')
    : require('./serverDevelopment');

dotenv.config();
const { PORT } = process.env;

app.listen(PORT, error => {
  if (error) {
    console.log(error);
  } else {
    console.info('🌎  Server is listening on port %s.', PORT);
  }
});
