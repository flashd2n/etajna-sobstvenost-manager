const passport = require('passport');
const { Strategy } = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const configAuth = (app, apartments, db) => {
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
            apartments.checkValidUserUsername(username)
                .then((user) => {
                    // CHECK PASSWORD
                    done(null, user);
                })
                .catch((err) => {
                    done(null, false,
                        { message: 'Invalid login credentials!' });
                });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        apartments.findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err);
            });
    });
};

module.exports = configAuth;
