/* eslint-disable max-len */
const { expect } = require('chai');
const { init } = require('../../../../app/data');
const sinon = require('sinon');

describe('Index Data Tests', () => {
    let database = null;
    let model = null;
    let validator = null;
    let data = null;
    const items = [1, 2];
    const record = {};
    let models = null;
    let validators = null;

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

        models = {
            requests: model,
            apartments: model,
            admin: model,
            expenses: model,
            fees: model,
        };

        validator = {
            isValid: sinon.stub().returns(true),
        };

        validators = {
            requestValidator: validator,
            apartmentValidator: validator,
            managerValidator: validator,
            expenseValidator: validator,
            feeValidator: validator,
        };
    });

    it('Init should return object with correct properties', (done) => {
        Promise.resolve()
            .then(() => {
                return init(database, models, validators);
            })
            .then((res) => {
                expect(res).to.have.property('db');
                expect(res).to.have.property('requests');
                expect(res).to.have.property('apartments');
                expect(res).to.have.property('admin');
                expect(res).to.have.property('expenses');
                expect(res).to.have.property('fees');
                done();
            });
    });
});
