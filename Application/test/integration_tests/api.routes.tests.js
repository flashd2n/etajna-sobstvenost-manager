/* eslint-disable max-len */
const request = require('supertest');
const { expect } = require('chai');

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

    describe('GET USER ROUTE', () => {
        it('Should return 401 Unauthorized when not logged', (done) => {
            request(app)
                .get('/api/getuser')
                .expect(401)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Should return correct message when not logged', (done) => {
            request(app)
                .get('/api/getuser')
                .expect(401)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.text).to.contain('You need to be logged in');
                    return done();
                });
        });

        it('Should return 401 Unauthorized when not logged', (done) => {
            request(app)
                .get('/api/getuser')
                .expect(401)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Should return 200 OK when logged in', (done) => {
            let cookie = null;
            request(app)
                .post('/login')
                .send({ username: 'apt20', password: '1234' })
                .end((err, res) => {
                    cookie = res.headers['set-cookie'];
                    request(app)
                        .get('/api/getuser')
                        .set('cookie', cookie)
                        .expect(200)
                        .end((errr, ress) => {
                            done();
                        });
                });
        });

        it('Should return correct user data when logged in', (done) => {
            let cookie = null;
            request(app)
                .post('/login')
                .send({ username: 'apt20', password: '1234' })
                .end((err, res) => {
                    cookie = res.headers['set-cookie'];
                    request(app)
                        .get('/api/getuser')
                        .set('cookie', cookie)
                        .expect(200)
                        .end((errr, ress) => {
                            const userdata = JSON.parse(ress.text);
                            expect(userdata.username).to.be.equal('apt20');
                            done();
                        });
                });
        });
    });

    describe('NOT PAID FEES ROUTE', () => {
        let id = null;
        before(() => {
            db.collection('apartments').findOne({ number: 20 })
                .then((apt) => {
                    id = apt._id + '';
                });
        });
        it('Should return 200 OK when valid user id is provided', (done) => {
            request(app)
                .get(`/api/notpaidfees/${id}`)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Should return json content type valid user id', (done) => {
            request(app)
                .get(`/api/notpaidfees/${id}`)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Should return correct data valid user id', (done) => {
            request(app)
                .get(`/api/notpaidfees/${id}`)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    const response = JSON.parse(res.text);
                    expect(response).to.have.length(3);
                    expect(response[0]).to.have.property('cost');
                    expect(response[0]).to.have.property('month');
                    expect(response[0]).to.have.property('year');
                    expect(response[0]).to.have.property('_id');
                    return done();
                });
        });
    });

    describe('NOT PAID EXPENSES ROUTE', () => {
        let id = null;
        before(() => {
            db.collection('apartments').findOne({ number: 20 })
                .then((apt) => {
                    id = apt._id + '';
                });
        });
        it('Should return 200 OK when valid user id is provided', (done) => {
            request(app)
                .get(`/api/notpaidexpenses/${id}`)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Should return json content type valid user id', (done) => {
            request(app)
                .get(`/api/notpaidexpenses/${id}`)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Should return correct data valid user id', (done) => {
            request(app)
                .get(`/api/notpaidexpenses/${id}`)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    const response = JSON.parse(res.text);
                    expect(response).to.have.length(3);
                    expect(response[0]).to.have.property('cost');
                    expect(response[0]).to.have.property('name');
                    expect(response[0]).to.have.property('description');
                    expect(response[0]).to.have.property('_id');
                    return done();
                });
        });
    });

    describe('ALL DEBTORS ROUTE', () => {
        it('Should return 200', (done) => {
            request(app)
                .get('/api/alldebtors')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Should return json as content type', (done) => {
            request(app)
                .get('/api/alldebtors')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Should return correct data', (done) => {
            request(app)
                .get('/api/alldebtors')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    const data = JSON.parse(res.text);
                    expect(data).to.have.length(18);
                    expect(data[0]).to.have.property('type');
                    expect(data[0]).to.have.property('username');
                    expect(data[0]).to.have.property('_id');
                    expect(data[0]).to.have.property('number');
                    expect(data[0].paidFees).to.be.an('array');
                    expect(data[0].notPaidFees).to.be.an('array');
                    expect(data[0].paidExpenses).to.be.an('array');
                    expect(data[0].notPaidExpenses).to.be.an('array');
                    return done();
                });
        });
    });

    describe('CURRENT EXPENSE ROUTE', () => {
        it('Should return 200', (done) => {
            request(app)
                .get('/api/currentexpenses')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Should return json as content type', (done) => {
            request(app)
                .get('/api/currentexpenses')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Should return correct data', (done) => {
            request(app)
                .get('/api/currentexpenses')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    const data = JSON.parse(res.text);
                    expect(data).to.have.length(3);
                    expect(data[0]).to.have.property('cost');
                    expect(data[0]).to.have.property('description');
                    expect(data[0]).to.have.property('_id');
                    expect(data[0]).to.have.property('name');
                    expect(data[0]).to.have.property('state');
                    expect(data[0]).to.have.property('type');
                    expect(data[0].paid).to.be.an('array');
                    expect(data[0].notPaid).to.be.an('array');
                    return done();
                });
        });
    });

    describe('PAY FEE ROUTE', () => {
        let aptId = null;
        let feeId = null;
        before(() => {
            db.collection('apartments').findOne({ number: 20 })
                .then((apt) => {
                    aptId = apt._id + '';
                    return db.collection('fees').findOne({ month: 3 });
                })
                .then((fee) => {
                    feeId = fee._id;
                });
        });

        it('Should return 200 OK when valid data is provided', (done) => {
            request(app)
                .put(`/api/payfee/${aptId}`)
                .send({ feeId: feeId })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Should return Success when valid data is provided', (done) => {
            request(app)
                .put(`/api/payfee/${aptId}`)
                .send({ feeId: feeId })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.text).to.equal('Success');
                    return done();
                });
        });

        it('Should return correct message when invalid fee is provided', (done) => {
            request(app)
                .put(`/api/payfee/${aptId}`)
                .send({ feeId: 'feeId' })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.text).to.equal('Invalid fee payment parameters');
                    return done();
                });
        });

        it('Should return correct message when invalid apt is provided', (done) => {
            request(app)
                .put(`/api/payfee/invalid`)
                .send({ feeId: feeId })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.text).to.equal('Invalid fee payment parameters');
                    return done();
                });
        });
    });

    describe('PAY EXPENSE ROUTE', () => {
        let aptId = null;
        let expenseId = null;
        before(() => {
            db.collection('apartments').findOne({ number: 20 })
                .then((apt) => {
                    aptId = apt._id + '';
                    return db.collection('expenses').findOne({ name: 'expense 3' });
                })
                .then((expense) => {
                    expenseId = expense._id;
                });
        });

        it('Should return 200 OK when valid data is provided', (done) => {
            request(app)
                .put(`/api/payexpense/${aptId}`)
                .send({ expenseId: expenseId })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

        it('Should return Success when valid data is provided', (done) => {
            request(app)
                .put(`/api/payexpense/${aptId}`)
                .send({ expenseId: expenseId })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.text).to.equal('Success');
                    return done();
                });
        });

        it('Should return correct message when invalid fee is provided', (done) => {
            request(app)
                .put(`/api/payexpense/${aptId}`)
                .send({ expenseId: 'feeId' })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.text).to.equal('Invalid expense payment parameters');
                    return done();
                });
        });

        it('Should return correct message when invalid apt is provided', (done) => {
            request(app)
                .put(`/api/payexpense/invalid`)
                .send({ expenseId: expenseId })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.text).to.equal('Invalid expense payment parameters');
                    return done();
                });
        });
    });

    describe('REMOVE APT ROUTE', () => {
        it('Should return 401 when not logged', (done) => {
            request(app)
                .delete('/api/removeapt/20')
                .end((errr, ress) => {
                    if (errr) {
                        done(errr);
                    }
                    expect(ress.status).to.equal(401);
                    done();
                });
        });

        it('Should return 401 when admin is logged', (done) => {
            let cookie = null;
            request(app)
                .post('/login')
                .send({ username: 'apt20', password: '1234' })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    cookie = res.headers['set-cookie'];
                    request(app)
                        .delete('/api/removeapt/20')
                        .set('cookie', cookie)
                        .end((errr, ress) => {
                            if (errr) {
                                done(errr);
                            }
                            expect(ress.status).to.equal(401);
                            done();
                        });
                });
        });

        it('Should return 200 when admin is logged', (done) => {
            let cookie = null;
            request(app)
                .post('/login')
                .send({ username: 'InjTonchev', password: '1234' })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    cookie = res.headers['set-cookie'];
                    request(app)
                        .delete('/api/removeapt/20')
                        .set('cookie', cookie)
                        .end((errr, ress) => {
                            if (errr) {
                                done(errr);
                            }
                            expect(ress.status).to.equal(200);
                            done();
                        });
                });
        });

        it('Should return correct data when admin is logged', (done) => {
            let cookie = null;
            request(app)
                .post('/login')
                .send({ username: 'InjTonchev', password: '1234' })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    cookie = res.headers['set-cookie'];
                    request(app)
                        .delete('/api/removeapt/21')
                        .set('cookie', cookie)
                        .end((errr, ress) => {
                            if (errr) {
                                done(errr);
                            }
                            expect(ress.text).to.equal('Success');
                            done();
                        });
                });
        });
    });
});
