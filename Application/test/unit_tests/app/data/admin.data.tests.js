/* eslint-disable max-len */
const { expect } = require('chai');
const AdminData = require('../../../../app/data/admin.data');
const sinon = require('sinon');

describe('Requests Data Tests', () => {
    let database = null;
    let model = null;
    let validator = null;
    let data = null;
    const items = [1, 2];
    const record = {};
    const admin = {
        username: 'gosho',
        password: '1234',
    };

    beforeEach(() => {
        database = {
            collection: sinon.stub().returns({
                find: sinon.stub().returns({
                    toArray: sinon.stub().returns(Promise.resolve(items)),
                }),
                findOne: sinon.stub().returns(Promise.resolve(admin)),
                insert: sinon.stub().returns(Promise.resolve()),
                updateOne: sinon.stub().returns(Promise.resolve()),
                update: sinon.stub().returns(Promise.resolve()),
                updateMany: sinon.stub().returns(Promise.resolve()),
                remove: sinon.stub().returns(Promise.resolve()),
                drop: sinon.stub(),
            }),
        };

        model = {
            name: {
                toLowerCase: () => {
                    return 'model';
                },
            },
            toViewModel: sinon.stub().returns(record),
        };

        validator = {
            isValid: sinon.stub().returns(true),
        };

        data = new AdminData(database, model, validator);
    });

    describe('getUsername tests', () => {
        it('Should resolve correct admin username', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.getUsername();
                })
                .then((res) => {
                    expect(res).to.equal('gosho');
                    done();
                });
        });
    });

    describe('setUsernameAndPasswordHash tests', () => {
        it('Should call drop and return correct model', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.setUsernameAndPasswordHash('gosho', '1234');
                })
                .then((res) => {
                    expect(res).to.equal(record);
                    expect(database.collection().drop.callCount).to.equal(1);
                    done();
                });
        });
    });

    describe('authAdmin tests', () => {
        it('Should return correct model when username and password are valid', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.authAdmin('gosho', '1234');
                })
                .then((res) => {
                    expect(res).to.equal(record);
                    expect(database.collection().findOne.calledWith({ username: 'gosho' })).to.equal(true);
                    done();
                });
        });

        it('Should throw error when passwords do not match', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.authAdmin('gosho', '12345');
                })
                .catch((res) => {
                    expect(res.message).to.equal('Invalid password');
                    done();
                });
        });

        it('Should throw error when username is invalid', (done) => {
            database = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.resolve(items)),
                    }),
                    findOne: sinon.stub().returns(Promise.resolve()),
                    insert: sinon.stub().returns(Promise.resolve()),
                    updateOne: sinon.stub().returns(Promise.resolve()),
                    update: sinon.stub().returns(Promise.resolve()),
                    updateMany: sinon.stub().returns(Promise.resolve()),
                    remove: sinon.stub().returns(Promise.resolve()),
                    drop: sinon.stub(),
                }),
            };
            data = new AdminData(database, model, validator);
            Promise.resolve()
                .then(() => {
                    return data.authAdmin('gosho', '12345');
                })
                .catch((res) => {
                    expect(res.message).to.equal('Invalid user');
                    done();
                });
        });
    });
});
