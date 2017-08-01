/* eslint-disable max-len */

const { expect } = require('chai');
const index = require('../../../../app/controllers');

describe('Controllers Index Tests', () => {
    it('test me', () => {
        expect(index).to.be.an('object');
    });
});
