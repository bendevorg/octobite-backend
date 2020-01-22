/* eslint-disable no-console */
const mongoose = require('mongoose');
const fs = require('fs');
const logger = require('javascript-custom-logger');

const DB_HOST = `mongodb://${process.env.DB_USERNAME}:${encodeURIComponent(
  process.env.DB_PASSWORD
)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}
`;

// Connect to the database
mongoose.connect(DB_HOST, {
  auto_reconnect: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const database = mongoose.connection;

// Connection fails log the error
database.on('error', err => {
  logger.error(err);
});

// Connection ok log the success
database.once('open', () => {
  logger.info({ message: 'MongoDB connection is established.' });
});

// Connect lost log the event and try to reconnect
database.on('disconnected', () => {
  logger.warn({ message: 'MongoDB disconnected.' });
  mongoose.connect(DB_HOST, {
    auto_reconnect: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
});

// Connect restablished log the event
database.on('reconnected', () => {
  logger.info({ message: 'MongoDB reconnected.' });
});

// Load our DB models
const modelsPath = `${process.cwd()}/server/models`;
const remainingModels = [];

//  Fill schemas
fs.readdirSync(modelsPath).forEach(file => {
  if (file.indexOf('.js') && file !== 'database.js') {
    try {
      const schemaName = file.split('.')[0];
      /* eslint-disable-next-line global-require, import/no-dynamic-require */
      mongoose.Schema[schemaName] = require(`${modelsPath}/${file}`)(mongoose);
      mongoose.model(schemaName, mongoose.Schema[schemaName]);
      database[schemaName] = mongoose.model(schemaName);
    } catch (e) {
      remainingModels.push(file);
    }
  }
});

let remainingModelIndex = 0;

while (remainingModels.length > 0) {
  try {
    const schemaName = remainingModels[remainingModelIndex].split('.')[0];
    /* eslint-disable-next-line global-require, import/no-dynamic-require */
    mongoose.Schema[schemaName] = require(`${modelsPath}/${
      remainingModels[remainingModelIndex]
    }`)(mongoose);
    mongoose.model(schemaName, mongoose.Schema[schemaName]);
    database[schemaName] = mongoose.model(schemaName);
    remainingModels.splice(remainingModelIndex, 1);
  } catch (e) {
    remainingModelIndex =
      remainingModelIndex >= remainingModels.length - 1
        ? 0
        : remainingModelIndex + 1;
  }
}

module.exports = database;
