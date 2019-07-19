/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filename = '.env';
const envFile = path.resolve(__dirname, `../${filename}`);

const credentialsPath = path.resolve(`${process.cwd()}/.credentials`);
const configVars = [];

/**
 * Get all our configs inside de configs folder
 */

/**
 * Constant that will contain the .env variables
 * If you want a new environment variable on build add here
 */

if (fs.existsSync(`${process.cwd()}/tools/environment.json`)) {
  configVars.push(
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(`${process.cwd()}/tools/environment.json`)[process.argv[2]]
  );
}

// Get our credentials
if (fs.existsSync(credentialsPath)) {
  fs.readdirSync(credentialsPath).forEach(file => {
    if (file.indexOf('.json') !== -1) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      configVars.push(require(`${credentialsPath}/${file}`)[process.argv[2]]);
    }
  });
}

/**
 * Write the .env file
 */
function completeFile() {
  const writeStream = fs.createWriteStream(envFile);

  configVars.forEach(config => {
    Object.keys(config).forEach(key => {
      const envVar = config[key];
      const newLine = `${key}=${envVar}`;
      console.log(`writing to file: ${newLine}`);
      writeStream.write(`${newLine}\n`);
    });
  });

  writeStream.end('');
  console.log(`${filename} is ok!`);
}

/**
 * Read the .env file
 */
function readFile() {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(envFile),
  });

  lineReader.on('close', completeFile);
}

/**
 * Create a new file using the name filename
 * Used if the .env already doest not exists
 */
function createFile() {
  fs.writeFile(envFile, '', function error(err) {
    if (err) {
      console.error(err);
    }

    readFile();
  });
}

/**
 * Check if the .env already exists. If it does read it
 * If it don't create it with the envVars
 *
 * @param {object} err
 * @param {object} stats
 */
function onStat(err, stats) {
  if (!err && stats.isFile()) {
    readFile();
  } else {
    console.log(`${filename} does not exist, creating it.`);
    createFile();
  }
}

/**
 * Check the stat of the file .env
 * Calling the callback onStat
 */
console.log(`checking file ${filename}`);
fs.stat(envFile, onStat);
