const passport = require('passport');
const { Strategy } = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sha256 = require('sha256');

const configAuth = (app, apartments, admin, db, config) => {
    app.use(cookieParser());
    app.use(session({
        secret: config.cookie.secret,
        maxAge: config.cookie.expirationTime,
        store: new MongoStore({ db }, (err) => {
            console.log(err.message);
        }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new Strategy(
        (username, password, done) => {
            const passowrdHash = sha256(password);
            admin
                .authAdmin(username, passowrdHash)
                .then((user) => {
                    done(null, user);
                })
                .catch(() => {
                    apartments
                        .authApartment(
                            username,
                            passowrdHash)
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
        if (loggedUser.type === 'admin') {
            admin.getById(loggedUser.id)
                .then((user) => {
                    done(null, user);
                })
                .catch((err) => {
                    // logout the user to avoid 
                    // "Failed to deserialize user out of session"
                    done(null, false);
                });
        } else if (loggedUser.type === 'apartment') {
            apartments.getById(loggedUser.id)
                .then((user) => {
                    done(null, user);
                })
                .catch((err) => {
                    // logout the user to avoid 
                    // "Failed to deserialize user out of session"
                    done(null, false);
                });
        }
    });
};

module.exports = configAuth;
