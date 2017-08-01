/* eslint-disable max-len */
const { expect } = require('chai');
const { isValid } = require('../../../../app/validators/fee.validator');
const sinon = require('sinon');

describe('Fee Validator Tests', () => {
    const model = {
        month: 4,
        year: '2017',
        cost: 50,
        paid: [],
        notPaid: [],
    };

    it('Should return true when model is valid', () => {
        const result = isValid(model);
        expect(result).to.equal(true);
    });

    it('Should return false when model has undefined properties', () => {
        const modelTwo = {
            year: '2017',
            cost: 50,
            paid: [],
            notPaid: [],
        };
        const result = isValid(modelTwo);
        expect(result).to.equal(false);
    });

    it('Should return false when model has invalid properties', () => {
        model.month = '4a';
        const result = isValid(model);
        expect(result).to.equal(false);
    });
});
