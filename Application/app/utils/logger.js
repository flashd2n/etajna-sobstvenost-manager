/* globals __dirname */

const fs = require('fs');
const path = require('path');

const log = (message) => {
    const config = require('../../config');

    if (config.env === config.dev) {
        console.log(message);
        return;
    }

    if (config.env === config.prod) {
        message = `\n${new Date(Date.now())} : ${message}`;

        const logPath = path.join(__dirname, '../../logs/logs.txt');

        fs.appendFileSync(logPath, message);

        return;
    }
};

module.exports = log;
