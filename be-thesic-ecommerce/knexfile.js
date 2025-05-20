'use strict';

const path = require('path');
const config = require('./app/config')

const BASE_PATH = path.join(__dirname, 'app', 'db');
console.log("config.database.connection: ", config.database.connection)
module.exports = {
  development: {
    client: 'pg',
    connection: config.database.connection,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
};
