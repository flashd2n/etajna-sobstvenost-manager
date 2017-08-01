/* eslint-disable max-len */
const { expect } = require('chai');
const { isValid } = require('../../../../app/validators/expense.validator');
const sinon = require('sinon');

describe('Expense Validator Tests', () => {
    const model = {
        name: 'gosho',
        description: 'awesome',
        cost: 50,
        state: 'pending',
        paid: [],
        notPaid: [],
    };

    it('Should return true when model is valid', () => {
        const result = isValid(model);
        expect(result).to.equal(true);
    });

    it('Should return false when model has undefined properties', () => {
        model.name = null;
        const result = isValid(model);
        expect(result).to.equal(false);
    });

    it('Should return false when model has invalid properties', () => {
        model.name = '';
        const result = isValid(model);
        expect(result).to.equal(false);
    });
});
