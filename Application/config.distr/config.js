/* globals process */
/* eslint-disable no-process-env */
const _ = require('lodash');

const config = {
    dev: 'development',
    prod: 'production',
    port: process.env.PORT || 3001,
    cookie: {
        secret: process.env.COOKIE_SECRET || 'Very Secret Much WoW',
        expirationTime: new Date(Date.now() + 60 * 60 * 1000),
    },
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;

let envConfig;

try {
    envConfig = require('./' + config.env);
    envConfig = envConfig || {};
} catch (error) {
    envConfig = {};
}

module.exports = _.merge(config, envConfig);
