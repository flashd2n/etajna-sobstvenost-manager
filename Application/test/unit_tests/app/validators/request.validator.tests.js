/* eslint-disable max-len */
const { expect } = require('chai');
const { isValid } = require('../../../../app/validators/request.validator');
const sinon = require('sinon');

describe('Request Validator Tests', () => {
    const model = {
        apartmentId: '597f599ece471b28a49d7ed5',
        number: '2017',
        username: 'gosho',
        password: '597f599ece471b28a49d7ed5597f599ece471b28a49d597f599ece471b28a49d',
    };

    it('Should return true when model is valid', () => {
        const result = isValid(model);
        expect(result).to.equal(true);
    });

    it('Should return false when model has undefined properties', () => {
        const modelTwo = {
            number: '2017',
            username: 'gosho',
            password: '1234',
        };
        const result = isValid(modelTwo);
        expect(result).to.equal(false);
    });

    it('Should return false when model has invalid properties', () => {
        model.number = '4a';
        const result = isValid(model);
        expect(result).to.equal(false);
    });
});
