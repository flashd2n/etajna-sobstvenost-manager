/* eslint-disable max-len */
const { expect } = require('chai');
const FeesData = require('../../../../app/data/fee.data');
const sinon = require('sinon');

describe('Requests Data Tests', () => {
    let database = null;
    let model = null;
    let validator = null;
    let data = null;
    const items = [1, 2];
    const record = {};

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

        data = new FeesData(database, model, validator);
    });

    it('The Most Useful Test', () => {
        expect(data).not.to.equal(null);
    });
});
