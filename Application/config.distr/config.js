/* globals process */
/* eslint-disable no-process-env */

const port = process.env.PORT || 3001;
const connectionString = process.env.DB_CONNECTION || 'mongodb://localhost/etajna-sobstvenost-manager-dev';

module.exports = { port, connectionString };
