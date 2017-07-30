const supertest = require('supertest');

describe('AJAX routes tests', () => {
    let app = null;
    let db = null;

    before(() => {
        const connectionString = 'mongodb://localhost/etajna-sobstvenost-manager-dev';
        const config = require('../../config');

        const { Logger } = require('../../utils');
        const logger = new Logger(config);
        const controllers = require('../../app/controllers');
        const { ControllersFactory } = require('../../utils/factories');
        const validators = require('../../app/validators');

        const models = {
            requests: require('../../app/models/request.model'),
            apartments: require('../../app/models/apartment.model'),
            admin: require('../../app/models/admin.model'),
            expenses: require('../../app/models/expense.model'),
            fees: require('../../app/models/fee.model'),
        };

        return Promise.resolve()
            .then(() => {
                return require('../../database').init(connectionString);
            })
            .then((database) => {
                db = database;
                return require('../../utils').seed(database);
            })
            .then(() => {
                return db;
            })
            .then((database) => {
                return require('../../app/data')
                    .init(database, models, validators);
            })
            .then((data) => {
                const controllersFactory = new ControllersFactory(controllers,
                    data, logger);
                return require('../../app')
                    .init(data, controllersFactory, config);
            })
            .then((_app) => {
                app = _app;
            });
    });

    after(() => {
        return db.dropDatabase()
            .then(() => {
                db.close();
            });
    });

    describe('GET', () => {
        it('expect to return 200', (done) => {
            supertest(app)
                .get('/')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});
