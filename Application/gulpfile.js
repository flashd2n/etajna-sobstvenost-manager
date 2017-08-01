/* globals process */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const gulpSequence = require('gulp-sequence');

gulp.task('dev', () => {
    return nodemon({
        ext: 'js html',
        script: 'dev.js',
    });
});

gulp.task('pre-test', () => {
    return gulp.src(['./app/controllers/**/*.js',
        './app/data/**/*.js',
        './app/models/**/*.js',
        './app/routers/**/*.js',
        './app/validators/**/*.js',
        './database/**/*.js',
        './utils/factories/**/*.js',
        './utils/logger'])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('alltests', ['pre-test'], () => {
    return gulp.src(['./test/unit_tests/**/*.js',
        './test/integration_tests/**/*.js'])
        .pipe(mocha({
            timeout: 10000,
        }))
        .pipe(istanbul.writeReports());
});

gulp.task('unit', ['pre-test'], () => {
    return gulp.src('./test/unit_tests/**/*.js')
        .pipe(mocha({
            timeout: 10000,
        }))
        .pipe(istanbul.writeReports());
});

gulp.task('integration', ['pre-test'], () => {
    return gulp.src('./test/integration_tests/**/*.js')
        .pipe(mocha({
            timeout: 10000,
        }))
        .pipe(istanbul.writeReports());
});

gulp.task('functional', () => {
    return gulp.src('./test/functional_tests/**/*.js')
        .pipe(mocha({
            reporter: 'nyan',
            timeout: 60000,
        })).on('end', () => {
            process.exit();
        });
});

gulp.task('auto-setup', () => {
    return Promise.resolve()
        .then(() => {
            try {
                require('./config');
                return Promise.resolve();
            } catch (error) {
                console.log('Configuration has not been set up. '
                    + 'Automatically copying distributed configuration.');
                const { ncp } = require('ncp');

                return new Promise((resolve, reject) => {
                    ncp('./config.distr', './config', (fileCopyError) => {
                        if (fileCopyError) {
                            console.error(fileCopyError);
                            reject();
                        }

                        console.log('Configuraiton copied!');
                        resolve();
                    });
                });
            }
        });
});

gulp.task('lint', () => {
    return Promise.resolve().then(() => {
        return gulp.src(['**/*.js', '!node_modules/**'])
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });
});

gulp.task('start-server', () => {
    const config = require('./config');

    if (config.env === config.dev) {
        return Promise.resolve()
            .then(() => require('./database').init(config.connectionString))
            .then(async (db) => {
                await require('./utils/index').seed(db);
                await db.close();
                return;
            })
            .then(() => {
                return nodemon({
                    ext: 'js html',
                    script: 'dev.js',
                });
            });
    }

    const { Logger } = require('./utils');
    const logger = new Logger(config);
    const controllers = require('./app/controllers');
    const { ControllersFactory } = require('./utils/factories');
    const validators = require('./app/validators');

    const models = {
        requests: require('./app/models/request.model'),
        apartments: require('./app/models/apartment.model'),
        admin: require('./app/models/admin.model'),
        expenses: require('./app/models/expense.model'),
        fees: require('./app/models/fee.model'),
    };

    return Promise.resolve()
        .then(() => require('./database').init(config.connectionString))
        .then((database) => require('./app/data')
            .init(database, models, validators))
        .then((data) => {
            const controllersFactory = new ControllersFactory(controllers,
                data, logger);

            return require('./app').init(data, controllersFactory, config);
        })
        .then((app) => {
            return app.listen(
                config.port,
                () => console.log(`Server started and `
                    + `listending on port ${config.port}`)
            );
        });
});

gulp.task('start',
    gulpSequence('auto-setup', 'lint', 'unit', 'integration', 'start-server'));
