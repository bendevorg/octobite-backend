const NodeCache = require('node-cache');

// stdTTL: time to live in seconds for every generated cache element.
const cache = new NodeCache();
module.exports = cache;
