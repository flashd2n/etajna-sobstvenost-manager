/* eslint-disable max-len */
const { expect } = require('chai');
const index = require('../../../../app/validators/');

describe('Request Validator Tests', () => {
    it('Should return true when model is valid', () => {
        expect(index).to.have.property('apartmentValidator');
        expect(index).to.have.property('managerValidator');
        expect(index).to.have.property('requestValidator');
        expect(index).to.have.property('expenseValidator');
        expect(index).to.have.property('feeValidator');
    });
});
