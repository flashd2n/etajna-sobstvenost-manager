/* eslint-disable max-len */
const { expect } = require('chai');
const { isValid } = require('../../../../app/validators/manager.validator');

describe('Manager Validator Tests', () => {
    it('Should return true when model is valid', () => {
        const result = isValid('');
        expect(result).to.equal(true);
    });
});
