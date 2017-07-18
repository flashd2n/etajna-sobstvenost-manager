
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const setup = (app, appartmentsData) => {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            appartmentsData.checkValidUserUsername(username, password)
                .then((appartment) => done(null, appartment))
                .catch((error) => {
                    done(null, false,
                        { message: 'Invalid login credentials!' });
                });
        }
    ));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        appartmentsData.getById(id)
            .then((userWithoutPassword) =>
                done(null, userWithoutPassword));
    });
};

module.exports = setup;
