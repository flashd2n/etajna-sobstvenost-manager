const passport = require('passport');
const { Strategy } = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sha256 = require('sha256');

const configAuth = (app, apartments, manager, db) => {
    app.use(cookieParser());
    app.use(session({
        secret: 'Very Secret Much WoW',
        maxAge: new Date(Date.now() + 60 * 60 * 1000),
        store: new MongoStore({ db }, (err) => {
            console.log(err.message);
        }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new Strategy(
        (username, password, done) => {
            const passowrdHash = sha256(password);
            console.log(passowrdHash);
            manager
                .checkValidUserUsernameAndPasswordHash(username, passowrdHash)
                .then((user) => {
                    done(null, user);
                })
                .catch(() => {
                    apartments
                        .checkValidUserUsernameAndPasswordHash(username, passowrdHash)
                        .then((user) => {
                            done(null, user);
                        })
                        .catch((err) => {
                            done(null, false,
                                { message: 'Invalid login credentials!' });
                        });
                });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, { type: user.type, id: user._id });
    });

    passport.deserializeUser((loggedUser, done) => {
        if (loggedUser.type === 'manager') {
            manager.getById(loggedUser.id)
                .then((user) => {
                    done(null, user);
                })
                .catch((err) => {
                    done(err);
                });
        } else if (loggedUser.type === 'appartment') {
            apartments.getById(loggedUser.id)
                .then((user) => {
                    done(null, user);
                })
                .catch((err) => {
                    done(err);
                });
        }
    });
};

module.exports = configAuth;
