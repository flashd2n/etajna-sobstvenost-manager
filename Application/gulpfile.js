const gulp = require('gulp');

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

gulp.task('start-server', ['auto-setup'], () => {
    const config = require('./config');

    return Promise.resolve()
        .then(() => require('./database').init(config.connectionString))
        .then((database) => require('./data').init(database))
        .then((data) => require('./app').init(data))
        .then((app) => {
            return app.listen(
                config.port,
                () => console.log(`Server started and `
                    + `listending on port ${config.port}`)
            );
        });
});
