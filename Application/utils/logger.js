/* globals __dirname */

const fs = require('fs');
const path = require('path');

class Logger {
    constructor(config) {
        this.config = config;
    }

    log(message) {
        if (this.config.env === this.config.dev) {
            console.log(message);
            return;
        }

        if (this.config.env === this.config.prod) {
            message = `\n${new Date(Date.now())} : ${message}`;

            const logPath = path.join(__dirname, '../logs/logs.txt');

            fs.appendFileSync(logPath, message);

            return;
        }
    }
}

module.exports = Logger;
