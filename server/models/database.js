const mongoose = require('mongoose');
const fs = require('fs');

const DB_HOST =
  'mongodb://' +
  process.env.DB_USERNAME +
  ':' +
  encodeURIComponent(process.env.DB_PASSWORD) +
  '@' +
  process.env.DB_HOST +
  ':' +
  process.env.DB_PORT +
  '/' +
  process.env.DB_NAME;

// Connect to the database
mongoose.connect(
  DB_HOST,
  {
    auto_reconnect: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

const database = mongoose.connection;

// Connection fails log the error
database.on('error', err => {
  console.error('MongoDB connection error: ', err);
});

// Connection ok log the success
database.once('open', () => {
  console.info('MongoDB connection is established.');
});

// Connect lost log the event and try to reconnect
database.on('disconnected', () => {
  console.error('MongoDB disconnected.');
  mongoose.connect(
    DB_HOST,
    { server: { auto_reconnect: true } }
  );
});

// Connect restablished log the event
database.on('reconnected', () => {
  console.info('MongoDB reconnected.');
});

// Load our DB models
let modelsPath = process.cwd() + '/server/models';
let remainingModels = [];

//  Fill schemas
fs.readdirSync(modelsPath).forEach(file => {
  if (file.indexOf('.js') && file !== 'database.js') {
    try {
      let schemaName = file.split('.')[0];
      mongoose.Schema[schemaName] = require(modelsPath + '/' + file)(mongoose);
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
    let schemaName = remainingModels[remainingModelIndex].split('.')[0];
    mongoose.Schema[schemaName] = require(modelsPath + '/' + remainingModels[remainingModelIndex])(mongoose);
    mongoose.model(schemaName, mongoose.Schema[schemaName]);
    database[schemaName] = mongoose.model(schemaName);
    remainingModels.splice(remainingModelIndex, 1);
  } catch (e) {
    remainingModelIndex = remainingModelIndex === remainingModels.length - 1 ? 0 : remainingModelIndex + 1;
  }
}

module.exports = database;
