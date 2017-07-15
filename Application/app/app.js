const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const init = () => {
    const app = express();

    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser('keyboard cat')); // WTF is keyboard cat?
    app.use(session({ cookie: { maxAge: 60000 } }));

    app.use(require('connect-flash')());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });

    require('./routers').attachTo(app);

    return Promise.resolve(app);
};

module.exports = { init };
