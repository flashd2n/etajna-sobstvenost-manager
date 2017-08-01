/* globals process */
/* eslint-disable no-process-env */
const _ = require('lodash');

const config = {
    port: 3003,
    cookie: {
        secret: process.env.COOKIE_SECRET || 'Very Secret Much WoW',
        expirationTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
};

const envConfig = require('./functional_tests.js');

module.exports = _.merge(config, envConfig);
