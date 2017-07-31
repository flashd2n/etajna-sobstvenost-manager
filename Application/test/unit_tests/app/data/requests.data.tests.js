/* eslint-disable max-len */
const { ObjectId } = require('mongodb');
const { expect } = require('chai');
const RequestsData = require('../../../../app/data/requests.data');
const sinon = require('sinon');

describe('Requests Data Tests', () => {
    let database = null;
    let model = null;
    let validator = null;
    let data = null;
    const items = [1, 2];
    const record = {};
    const id = '597f599ece471b28a49d7ed5';
    const username = 'gosho';

    beforeEach(() => {
        database = {
            collection: sinon.stub().returns({
                find: sinon.stub().returns({
                    toArray: sinon.stub().returns(Promise.resolve(items)),
                }),
                findOne: sinon.stub().returns(Promise.resolve(record)),
                insert: sinon.stub().returns(Promise.resolve()),
                updateOne: sinon.stub().returns(Promise.resolve()),
                update: sinon.stub().returns(Promise.resolve()),
                updateMany: sinon.stub().returns(Promise.resolve()),
                remove: sinon.stub().returns(Promise.resolve()),
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

        data = new RequestsData(database, model, validator);
    });

    describe('getByUsername tests', () => {
        it('Should call findOne and toViewModel with correct args, resolve and return correct object', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.getByUsername(username);
                })
                .then((result) => {
                    expect(result).to.equal(record);
                    expect(database.collection().findOne.calledWith({ username })).to.equal(true);
                    expect(model.toViewModel.calledWith(record)).to.equal(true);
                    done();
                });
        });

        it('Should resolve with null when no model is found in db', (done) => {
            database = {
                collection: sinon.stub().returns({
                    findOne: sinon.stub().returns(Promise.resolve()),
                }),
            };
            data = new RequestsData(database, model, validator);
            Promise.resolve()
                .then(() => {
                    return data.getByUsername(username);
                })
                .then((result) => {
                    expect(result).to.equal(null);
                    done();
                });
        });
    });

    describe('deleteById tests', () => {
        it('Should call remove with correct arguments and resolve when valid id', (done) => {
            const filter = { _id: new ObjectId(id) };
            const options = {};
            Promise.resolve()
                .then(() => {
                    return data.deleteById(id);
                })
                .then(() => {
                    expect(database.collection().remove.calledWith(filter, options)).to.equal(true);
                    done();
                });
        });
    });

    describe('deleteByAppartmentId tests', () => {
        it('Should call remove with correct arguments and resolve when valid id', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.deleteByAppartmentId(id);
                })
                .then(() => {
                    expect(database.collection().remove.calledWith({ apartmentId: id })).to.equal(true);
                    done();
                });
        });
    });
});
