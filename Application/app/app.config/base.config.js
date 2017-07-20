/* globals __dirname */

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const configApp = (app) => {
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/libs', express.static(path
        .join(__dirname, '../../node_modules')));
    app.use('/public', express.static(path
        .join(__dirname, '../../public')));
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');
    app.use(require('connect-flash')());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });
};

module.exports = configApp;
